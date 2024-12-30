import { Column, ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox.tsx";
import { Button } from "../../ui/button.tsx";
import { timeAgo } from "../../../lib/utils.ts";
import ProfileImg from "../../ProfileImg.tsx";
import { Folders } from "../../../lib/types";
import { ArrowUpDown } from "lucide-react";
import { Link } from "react-router";
import ActionDropMenu from "../../dialogs/ActionDropMenu.tsx";
import { DropdownMenuItem } from "../../ui/dropdown-menu.tsx";
import { FolderEditDialog } from "../../dialogs/FolderEditDialog.tsx";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../../hooks/use-toast.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store.ts";
import { deleteFolder } from "../../../lib/action/folder.action.ts";
import DeleteDialog from "../../dialogs/DeleteDialog.tsx";
import useMutate from "../../../hooks/useMutate.ts";

type ColumnType = Column<Folders>;

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

export const folderColumns: ColumnDef<Folders>[] = [
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
  },
  {
    id: "name",
    accessorKey: "folder_name",
    header: createSortableHeader("NAME"),
    cell: ({ row }) => (
      <span>
        <Link to={`${row.original._id}`}>{row.original.folder_name}</Link>
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: createSortableHeader("CREATED"),
    cell: ({ row }) => <div>{timeAgo(row.original.createdAt)}</div>,
  },
  {
    accessorKey: "updatedAt",
    header: createSortableHeader("EDITED"),
    cell: ({ row }) => <div>{timeAgo(row.original.updatedAt)}</div>,
  },
  {
    accessorKey: "creator",
    header: "AUTHOR",
    cell: ({ row }) => (
      <ProfileImg
        profile_url={row.original.creator.profile_url}
        full_name={row.original.creator.full_name}
      />
    ),
  },
  {
    accessorKey: "files",
    header: "ACTIONS",
    cell: ({ row }) => {
      const [deleteDialog, setDeleteDialog] = useState(false);

      const deleteMutation = async (clerkId: string): Promise<any> => {
        try {
          return await deleteFolder({
            folderIds: row.original._id,
            userId: clerkId,
          });
        } catch (e) {
          const error = e as Error;
          throw new Error(error?.message || "An Error Occurred");
        }
      };

      const mutate = useMutate(
        deleteMutation,
        { queryKey: ["getFolders"] },
        setDeleteDialog,
      );

      const handleDelete = () => {
        if (mutate?.mutate) {
          mutate.mutate();
        }
      };

      return (
        <ActionDropMenu _id={row.original._id} type={"folder"}>
          <FolderEditDialog _id={row.original._id}>
            <DropdownMenuItem
              onSelect={(event) => event.preventDefault()}
              className={"w-full"}
            >
              Edit
            </DropdownMenuItem>
          </FolderEditDialog>
          <DeleteDialog
            isOpen={deleteDialog}
            handleDelete={handleDelete}
            setOpen={setDeleteDialog}
            isLoading={mutate?.isPending}
          />
        </ActionDropMenu>
      );
    },
  },
];
