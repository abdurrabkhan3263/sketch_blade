import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../ui/dialog.tsx";
import {Input} from "../ui/input.tsx";
import {Button} from "../ui/button.tsx";
import {cn} from "../../lib/utils.ts";
import {Label} from "../ui/label.tsx";
import {Separator} from "../ui/separator.tsx";

interface MoveFileDialogProps {
    children: React.ReactNode
}

const MoveFileDialog:React.FC<MoveFileDialogProps> = ({children}) => {
    const [seletedFolder, setSelectedFolder] = React.useState(null);

    return (
      <Dialog>
        <DialogTrigger className={"w-full"}>{children}</DialogTrigger>
        <DialogContent className="dark-container sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Move Folder</DialogTitle>
            <DialogDescription>
              Move the folder to another location
            </DialogDescription>
          </DialogHeader>
          <div>
            <div>
              <Label>Search Folder</Label>
              <Input
                className={cn(
                  "rounded-none border-0 border-b !bg-transparent shadow-none outline-none ring-0 focus:border-0 focus:border-b focus:placeholder-gray-500 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                  "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                )}
                placeholder={"Search folder to move"}
              />
            </div>

              <div className={"mt-5"}>
                    <Label>Select Folder</Label>
                  <Separator className={"my-2"}/>
                  <div className={"flex flex-col gap-y-2"}>
                      <div>
                          <h1>Hello world</h1>
                      </div>
                      <div>
                          <h1>Hello world</h1>
                      </div>
                      <div>
                          <h1>Hello world</h1>
                      </div>
                      <div>
                          <h1>Hello world</h1>
                      </div>
                  </div>
              </div>
          </div>
            <DialogFooter>
                <Button variant={"app"} className={"w-full"} disabled={!seletedFolder}>
                    Submit
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    );
}

export default MoveFileDialog
