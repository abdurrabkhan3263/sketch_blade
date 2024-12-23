import React, { useState, useEffect } from "react";
import { File } from "../../lib/Types";
import { DataTable } from "./Data-table.tsx";
import { fileColumns } from "./FileColumns.tsx";
import { getFiles } from "../../lib/action/files.action.ts";
import { useToast } from "../../hooks/use-toast.ts";
import { ToastAction } from "../../components/ui/toast.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";

interface FilesTableProps {
  type: "all" | "my" | "recent";
}

const FilesTable: React.FC<FilesTableProps> = ({ type }) => {
  const [data, setData] = useState<File[]>([]);
  const { toast } = useToast();
  const userId = useSelector((state: RootState) => state.auth?._id);

  useEffect(() => {
    if (!userId) return;

    (async () => {
      try {
        const response = await getFiles({
          user: userId,
        });

        if (response) {
          switch (type) {
            case "all":
              setData(response);
              break;
            case "my":
              setData(
                response.filter((file: File) => file.creator._id === userId),
              );
              break;
            case "recent":
              setData(response.slice(0, 5));
              break;
          }
        }
      } catch (err) {
        toast({
          title: err?.message,
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    })();
  }, [userId]);

  return <DataTable columns={fileColumns} data={data} />;
};
export default FilesTable;
