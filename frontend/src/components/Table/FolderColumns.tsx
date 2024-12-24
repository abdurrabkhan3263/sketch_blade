import { Column, ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox.tsx";
import { Button } from "../ui/button.tsx";
import { timeAgo } from "../../lib/utils.ts";
import ProfileImg from "../ProfileImg.tsx";
import { CreatorDetails, Folders } from "../../lib/Types";
import { BsThreeDots } from "react-icons/bs";
import { ArrowUpDown } from "lucide-react";

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
    accessorKey: "folder",
    header: createSortableHeader("NAME"),
    cell: ({ row }) => <div>{row.original.folder_name}</div>,
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
    cell: ({ row }) => (
      <Button
        className="text-xs"
        onClick={() => console.log("clicked on row", row.original)}
      >
        <BsThreeDots />
      </Button>
    ),
  },
];
