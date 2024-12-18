"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox.tsx";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../../ui/button.tsx";
import { File } from "../../../lib/Types";

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
    // id: "Name",
    accessorKey: "file_name",
    header: ({ column }) => {
      return (
        <Button
          variant="none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NAME
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("file_name")}</div>
    ),
  },
  {
    accessorKey: "folder_name",
    header: "Location",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("folder_name")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("createdAt")}</div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("updatedAt")}</div>
    ),
  },
  {
    accessorKey: "active_collaborators.profile_url",
    header: "ACTIVE",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("creator.profile_url")}</div>
    ),
  },
  {
    accessorKey: "creator.profile_url",
    header: "Author",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("profile_url")}</div>
    ),
  },
];
