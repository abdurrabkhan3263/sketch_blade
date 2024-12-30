import { folderColumns } from "./columns/FolderColumns.tsx";
import { DataTable } from "./Data-table.tsx";
import { useResponse } from "../../hooks/useResponse.tsx";
import { Loader2 } from "lucide-react";
import { Folders } from "../../lib/types";
import { useToast } from "../../hooks/use-toast.ts";
import { ToastAction } from "../ui/toast.tsx";
import { getFolders } from "../../lib/action/folder.action.ts";
import { Button } from "../ui/button.tsx";
import { FaFolderPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";
import { useState } from "react";

const folderSchema = z.object({
  folderName: z
    .string()
    .min(3, {
      message: "Folder name must be at least 3 characters long",
    })
    .optional(),
});

const FolderTable = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { clerkId } = useSelector((state: RootState) => state.auth);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const queryFn = async ({
    clerkId,
  }: {
    clerkId: string;
    _id: string;
  }): Promise<Folders[] | undefined> => {
    try {
      const response = await getFolders({ userId: clerkId });
      if (response) {
        return response;
      } else {
        return [];
      }
    } catch (err) {
      const error = err as Error;
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
      return [];
    }
  };

  const { data, isPending } = useResponse({
    queryFn: queryFn,
    queryKeys: ["getFolders"],
  });

  const mutationFun = async (folderName: string) => {
    try {
      const response = await axios.post(
        "/api/folder",
        { folder_name: folderName },
        {
          headers: {
            Authorization: `Bearer ${clerkId}`,
          },
        },
      );
      if (response.data.success) {
        return response.data.data;
      }
    } catch (e) {
      const error = e as AxiosError;
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive",
      });
      return [];
    }
  };

  const folderMutation = useMutation({
    mutationKey: ["createFolder"],
    mutationFn: mutationFun,
    onSuccess: () => {
      setIsDeleteDialogOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["getFolders"],
      });
      toast({
        title: "Success",
        description: "Folder created successfully",
      });
    },
    onError: (e) => {
      toast({
        title: e,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const zodHandler = folderSchema.safeParse({
        folderName: e.currentTarget.folderName.value,
      });
      if (!zodHandler.success) {
        const { message } = zodHandler.error.errors[0];
        return toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
      }
      const folderName = zodHandler.data.folderName;
      folderMutation.mutate(folderName);
    } catch (e) {
      toast({
        title: e,
        variant: "destructive",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => folderMutation.mutate}
          >
            Try again
          </ToastAction>
        ),
      });
    }
  };

  const handleDeleteDialogOpen = () => {
    if (folderMutation.isPending) return;
    setIsDeleteDialogOpen((prev) => !prev);
  };

  return (
    <>
      {isPending ? (
        <div className={"flex-center size-full"}>
          <div>
            <Loader2 className={"h-8 w-8 animate-spin"} />
          </div>
        </div>
      ) : (
        <>
          <div className={"mb-3 w-full text-end"}>
            <Dialog
              open={isDeleteDialogOpen}
              onOpenChange={handleDeleteDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant={"app"}>
                  New Folder <FaFolderPlus className={"ml-2"} />
                </Button>
              </DialogTrigger>
              <DialogContent className="dark-container sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add a new folder</DialogTitle>
                  <DialogDescription>
                    Create a new folder to organize your files
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <Label htmlFor="folderName">Folder Name</Label>
                    <Input
                      type="text"
                      id="folderName"
                      name="folderName"
                      placeholder="Enter folder name"
                      className="dark-input w-full"
                    />
                  </div>
                  <div className={"mt-4"}>
                    <Button type="submit" variant={"app"} className={"w-full"}>
                      {folderMutation.isPending ? (
                        <>
                          Creating...{" "}
                          <Loader2 className={"h-4 w-4 animate-spin"} />
                        </>
                      ) : (
                        "Create Folder"
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <DataTable columns={folderColumns} data={data as Folders[]} />
        </>
      )}
    </>
  );
};
export default FolderTable;
