import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox.tsx";
import { Button } from "../ui/button.tsx";
import { createSortableHeader } from "./FileColumns.tsx";
import { timeAgo } from "../../lib/utils.ts";
import ProfileImg from "../ProfileImg.tsx";
import { UserDetails } from "../../lib/Types";
import { BsThreeDots } from "react-icons/bs";

export const folderColumns: ColumnDef<Folder>[] = [
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
    accessorKey: "folder_name",
    header: createSortableHeader("NAME"),
  },
  {
    accessorKey: "createdAt",
    header: createSortableHeader("DATE CREATED"),
    cell: ({ row }) => <div>{timeAgo(row.getValue("createdAt"))}</div>,
  },
  {
    accessorKey: "updatedAt",
    header: createSortableHeader("LAST MODIFIED"),
    cell: ({ row }) => <div>{timeAgo(row.getValue("updatedAt"))}</div>,
  },
  {
    accessorKey: "creator",
    header: "AUTHOR",
    cell: ({ row }) => {
      const creator: UserDetails = row.getValue("creator");
      return (
        <ProfileImg
          profile_url={creator.profile_url}
          full_name={creator.full_name}
        />
      );
    },
  },
  {
    id: "actions",
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
