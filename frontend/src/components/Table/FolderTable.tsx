import { folderColumns } from "./columns/FolderColumns.tsx";
import { DataTable } from "./Data-table.tsx";
import { useResponse } from "../../hooks/useResponse.tsx";
import { Loader2 } from "lucide-react";
import { Folders } from "../../lib/Types";
import { useToast } from "../../hooks/use-toast.ts";
import { ToastAction } from "../ui/toast.tsx";
import { getFolders } from "../../lib/action/folder.action.ts";

const FolderTable = () => {
  const { toast } = useToast();

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
      toast({
        title: err,
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const { data, isPending } = useResponse({
    queryFn: queryFn,
    queryKeys: ["folders"],
  });

  return (
    <>
      {isPending ? (
        <div className={"flex-center size-full"}>
          <div>
            <Loader2 className={"h-8 w-8 animate-spin"} />
          </div>
        </div>
      ) : data && data.length > 0 ? (
        <DataTable columns={folderColumns} data={data as Folders[]} />
      ) : (
        <div className={"flex-center size-full"}>
          <div>
            <p className={"text-center text-gray-500"}>
              No folders found. Create a folder to get started.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
export default FolderTable;
