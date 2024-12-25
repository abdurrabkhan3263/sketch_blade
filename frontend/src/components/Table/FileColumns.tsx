import { ColumnDef, Column } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox.tsx";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button.tsx";
import {
  ActiveCollaborators as ActiveCollaboratorsType,
  Files,
} from "../../lib/Types";
import { timeAgo } from "../../lib/utils.ts";
import ProfileImg from "../ProfileImg.tsx";
import { Link } from "react-router";
import ActionDropMenu from "../ActionDropMenu.tsx";
import { FileEditDialog } from "../FileEditDialog.tsx";

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
    accessorKey: "files",
    header: "ACTIONS",
    cell: ({ row }) => {
      const payment = row.original;
      const { openDialogId, setOpenDialogId } = table.options.meta as {
        openDialogId: string | null;
        setOpenDialogId: (id: string | null) => void;
      };

      return (
        <ActionDropMenu>
          <FileEditDialog
            _id={payment._id}
            open={openDialogId === payment._id}
            onOpenChange={(open) => setOpenDialogId(open ? payment._id : null)}
          />
        </ActionDropMenu>
      );
    },
  },
];
