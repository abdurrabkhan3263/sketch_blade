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
import { useState } from "react";

interface ActionDropMenuProps {
  children: React.ReactNode;
}

function ActionDropMenu({ children }: ActionDropMenuProps) {
  const [open, setOpen] = useState(false);
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
        <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
          Open
        </DropdownMenuItem>
        {children}
        <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
          Share
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActionDropMenu;
