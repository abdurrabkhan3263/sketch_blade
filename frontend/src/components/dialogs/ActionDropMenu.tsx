import { Button } from "../ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu.tsx";
import { BsThreeDots } from "react-icons/bs";
import React, { useState } from "react";
import DeleteDialog from "./DeleteDialog.tsx";
import { useNavigate } from "react-router";

interface ActionDropMenuProps {
  _id: string;
  children: React.ReactNode;
  type: "file" | "folder";
}

function ActionDropMenu({ _id, children, type }: ActionDropMenuProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const childrenArray = React.Children.toArray(children);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="none" className={"transition-all hover:text-tertiary"}>
          <BsThreeDots />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark-container w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() =>
            navigate(type === "folder" ? `${_id}` : `/file/${_id}`)
          }
        >
          Open
        </DropdownMenuItem>
        {childrenArray[0]}
        {childrenArray[1]}
        <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
          Share
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActionDropMenu;
