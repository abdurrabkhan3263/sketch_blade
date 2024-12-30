import { ColumnDef, Column } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox.tsx";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../../ui/button.tsx";
import {
  ActiveCollaborators as ActiveCollaboratorsType,
  Files,
} from "../../../lib/types";
import { timeAgo } from "../../../lib/utils.ts";
import ProfileImg from "../../ProfileImg.tsx";
import { Link } from "react-router";
import ActionDropMenu from "../../dialogs/ActionDropMenu.tsx";
import { FileEditDialog } from "../../dialogs/FileEditDialog.tsx";
import { DropdownMenuItem } from "../../ui/dropdown-menu.tsx";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../../hooks/use-toast.ts";
import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store.ts";
import DeleteDialog from "../../dialogs/DeleteDialog.tsx";
import useMutate from "../../../hooks/useMutate.ts";
import { FileCreateDialog } from "../../dialogs/FileCreateDialog.tsx";

type ColumnType = Column<Files>;

const createSortableHeader = (label: string) => {
  return ({ column }: { column: ColumnType }) => (
    <div className={"w-full"}>
      <Button
        variant="none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="mx-auto flex items-center gap-1"
      >
        {label}
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    </div>
  );
};

const TimeDisplay = ({ value }: { value: string | null }) => (
  <div className="capitalize">{value ? timeAgo(value) : "-"}</div>
);

const ActiveCollaborators = ({
  collaborators,
}: {
  collaborators: ActiveCollaboratorsType[];
}) => {
  if (!collaborators?.length) return null;

  return (
    <div className="flex -space-x-4">
      {collaborators.slice(0, 3).map((collaborator, index) => (
        <div
          key={collaborator.full_name || index}
          className="relative overflow-hidden rounded-full"
          style={{ zIndex: 3 - index }}
        >
          <ProfileImg
            profile_url={collaborator.profile_url}
            full_name={collaborator.full_name}
          />
        </div>
      ))}
    </div>
  );
};

export const fileColumns: ColumnDef<Files>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className={"border-zinc-200"}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className={"border-zinc-200"}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name",
    accessorKey: "file_name",
    header: createSortableHeader("NAME"),
    cell: ({ row }) => (
      <span className={"transition-all hover:text-tertiary"}>
        <Link to={`/file/${row.original._id}`}>{row.original.file_name}</Link>
      </span>
    ),
  },
  {
    accessorKey: "folder",
    header: createSortableHeader("LOCATION"),
    cell: ({ row }) => (
      <>
        {row.original.folder ? (
          <span className={"transition-all hover:text-tertiary"}>
            <Link to={`/folder/${row.original._id}`}>
              {row.original.folder?.folder_name}
            </Link>
          </span>
        ) : (
          <>-</>
        )}
      </>
    ),
  },
  {
    accessorKey: "createdAt",
    header: createSortableHeader("CREATED"),
    cell: ({ row }) => <TimeDisplay value={row.getValue("createdAt")} />,
  },
  {
    accessorKey: "updatedAt",
    header: createSortableHeader("UPDATED"),
    cell: ({ row }) => <TimeDisplay value={row.getValue("updatedAt")} />,
  },
  {
    accessorKey: "active_collaborators",
    header: "ACTIVE",
    cell: ({ row }) => (
      <div className="flex items-center justify-center rounded-lg">
        <ActiveCollaborators
          collaborators={row.getValue("active_collaborators")}
        />
      </div>
    ),
  },
  {
    accessorKey: "creator",
    header: "AUTHOR",
    cell: ({ row }) => (
      <ProfileImg
        full_name={row.original.creator?.full_name}
        profile_url={row.original.creator?.profile_url}
      />
    ),
  },
  {
    accessorKey: "_id",
    header: "ACTIONS",
    cell: ({ row }) => {
      const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

      const deleteFn = async (clerkId: string): Promise<void> => {
        try {
          const response = await axios.delete(`/api/file/${row.original._id}`, {
            headers: {
              Authorization: `Bearer ${clerkId}`,
            },
          });
          if (response.status !== 200) {
            throw new Error(response.data.message);
          }
          return response.data;
        } catch (err) {
          const error = err as AxiosError;
          throw new Error(
            error.response?.data?.message ||
              error.message ||
              "An error occurred",
          );
        }
      };

      const mutate = useMutate(
        deleteFn,
        { queryKey: ["getFiles"] },
        setDeleteDialogOpen,
      );

      const handleDeleteFile = () => {
        if (mutate?.mutate) {
          mutate.mutate();
        }
      };

      return (
        <ActionDropMenu _id={row.original._id} type={"file"}>
          <FileCreateDialog _id={row.original._id} fileData={row.original}>
            <DropdownMenuItem
              onSelect={(event) => event.preventDefault()}
              className={"w-full"}
            >
              Edit
            </DropdownMenuItem>
          </FileCreateDialog>
          <DeleteDialog
            isOpen={deleteDialogOpen}
            handleDelete={handleDeleteFile}
            setOpen={setDeleteDialogOpen}
            isLoading={mutate?.isPending}
          />
        </ActionDropMenu>
      );
    },
  },
];
