import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog.tsx";
import { Input } from "../ui/input.tsx";
import { Button } from "../ui/button.tsx";
import { cn, timeAgo } from "../../lib/utils.ts";
import { Label } from "../ui/label.tsx";
import { Separator } from "../ui/separator.tsx";
import { useResponse } from "../../hooks/useResponse.tsx";
import {Loader2} from "lucide-react";
import axios from "axios";

interface MoveFileDialogProps {
  _id:string,
  children: React.ReactNode;
}

const MoveFileDialog: React.FC<MoveFileDialogProps> = ({ children }) => {
  const [selectedFolder, setSelectedFolder] = React.useState<string>();

  const { data:listFolders, isPending } = useResponse({
    queryFn: async ({clerkId }) => {
      return await axios.get(`/api/folder`,{
        headers: {
          Authorization: `Bearer ${clerkId}`,
        },
      })
    },
    queryKeys: ["getFolders"],
  });

  const handleClickToFolder = (folderId: string) => {
    setSelectedFolder((prev) => (prev === folderId ? undefined : folderId));
  };

  const handleSubmit = () => {};

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
            <div className={"max-h-40 min-h-10 overflow-y-auto"}>
              <div className={"flex h-full flex-col flex-wrap gap-4"}>
                {isPending ? (
                  <div className={"size-full flex-center"}>
                    <Loader2 className={"h-8 w-8 animate-spin"} />
                  </div>
                ) : listFolders.length <= 0 ? (
                  <div className={"flex h-10 items-center justify-center"}>
                    <p className={"text-xs text-gray-500"}>No folder found</p>
                  </div>
                ) : (
                  <>
                    {listFolders.map(({ _id, createdAt, folder_name }) => (
                      <div
                        key={_id}
                        id={_id}
                        className={cn(
                          "rounded-md bg-blue-500/30 p-2.5 dark:bg-blue-500/10",
                          selectedFolder &&
                            _id === selectedFolder &&
                            "bg-blue-500/60",
                        )}
                        onClick={() => handleClickToFolder(_id)}
                      >
                        <div className={"flex items-center justify-between"}>
                          <div className={"flex items-center gap-x-2"}>
                            <p className={"text-sm"}>{folder_name}</p>
                          </div>
                          <span>
                            <p className={"text-xs text-gray-400"}>
                              {timeAgo(createdAt)}
                            </p>
                          </span>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
            <Separator className={"mt-5"} />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant={"app"}
            className={"w-full"}
            disabled={!selectedFolder}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MoveFileDialog;
