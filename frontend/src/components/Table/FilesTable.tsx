import React from "react";
import { DataTable } from "./Data-table.tsx";
import { fileColumns } from "./FileColumns.tsx";
import { Button } from "../ui/button.tsx";
import { Loader2 } from "lucide-react";
import { useResponse } from "../../hooks/useResponse.tsx";
import { getFiles } from "../../lib/action/files.action.ts";
import { Files } from "../../lib/Types";
import { ToastAction } from "../ui/toast.tsx";
import { useToast } from "../../hooks/use-toast.ts";

interface FilesTableProps {
  type: "all" | "my";
}

const FilesTable: React.FC<FilesTableProps> = ({ type }) => {
  const { toast } = useToast();

  const queryFn = async ({
    clerkId,
    _id,
  }: {
    clerkId: string;
    _id: string;
  }): Promise<Files[] | undefined> => {
    try {
      const response = await getFiles({ user: clerkId });
      if (response) {
        switch (type) {
          case "all":
            return response;
          case "my":
            return response.filter((file: Files) => file.creator._id === _id);
        }
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
    queryKeys: ["files"],
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
        <DataTable columns={fileColumns} data={data as Files[]} />
      ) : (
        <IfNoFile />
      )}
    </>
  );
};
export default FilesTable;

const IfNoFile = () => {
  const handleCreateFile = () => {
    console.log("create file");
  };

  return (
    <div className={"flex-center size-full select-none px-8 md:px-0"}>
      <div className={"w-full rounded-2xl border py-14 md:w-[600px]"}>
        <div className={"size-icon flex-center mx-auto mb-4"}>
          <img
            src={"/assets/icons/file.svg"}
            className={"size-full object-cover"}
          />
        </div>
        <div className={"text-center"}>
          <Button className={"capitalize"} onClick={handleCreateFile}>
            create a black file
          </Button>
        </div>
      </div>
    </div>
  );
};
