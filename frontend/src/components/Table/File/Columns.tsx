import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../../ui/button";
import { File, UserDetails } from "../../../lib/Types";
import { timeAgo } from "../../../lib/utils";
import ProfileImg from "../../ProfileImg";

// Reusable function for creating sortable column headers
const createSortableHeader = (label: string) => {
  return ({ column }) => (
    <Button
      variant="none"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="flex items-center gap-1"
    >
      {label}
      <ArrowUpDown className="h-4 w-4" />
    </Button>
  );
};

// Reusable component for time display
const TimeDisplay = ({ value }: { value: string | null }) => (
  <div className="capitalize">{value ? timeAgo(value) : "-"}</div>
);

// Reusable component for active collaborators
const ActiveCollaborators = ({
  collaborators,
}: {
  collaborators: UserDetails[];
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

export const columns: ColumnDef<File>[] = [
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
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "file_name",
    header: createSortableHeader("NAME"),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("file_name")}</div>
    ),
  },
  {
    accessorKey: "folder_name",
    header: createSortableHeader("LOCATION"),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("folder_name")}</div>
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
    cell: ({ row }) => {
      const creator = row.getValue("creator") as UserDetails;
      return (
        <ProfileImg
          full_name={creator?.full_name}
          profile_url={creator?.profile_url}
        />
      );
    },
  },
];
