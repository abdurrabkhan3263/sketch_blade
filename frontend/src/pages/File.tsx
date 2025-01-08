import React, { useEffect } from "react";
import EditFile from "../components/file/EditFile.tsx";
import ToolBar from "../components/file/ToolBar.tsx";
import ShareSection from "../components/file/ShareSection.tsx";
import ZoomBtn from "../components/file/ZoomBtn.tsx";
import UndoBtn from "../components/file/UndoBtn.tsx";
import ToolBarAction from "../components/file/ToolBarAction.tsx";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useResponse } from "../hooks/useResponse.tsx";
import {Loader2} from "lucide-react";
import {File as FileType} from "../lib/types"

const File = () => {
  const fileId = useParams().id;
  const navigate = useNavigate();

  const { data, isPending,isError }:{data:FileType,isPending:boolean} = useResponse({
    queryKeys: [fileId as string],
    queryFn: async ({ clerkId }) => {
      return axios.get(`/api/file/${fileId}`, {
        headers: {
          Authorization: `Bearer ${clerkId}`,
        },
      });
    },
  });

  useEffect(() => {
    console.log(data)
    if(isError){
      navigate("/home")
    }
  }, [isError,data]);

  if (isPending)
    return (
      <div className={"size-screen flex-center bg-primary"}>
        <Loader2 size={64} className={"animate-spin text-quaternary"} />
      </div>
    );

  return (
    <main className={"size-screen relative bg-primary px-10 text-quaternary"}>
      <div className={"relative z-20 flex size-full flex-col justify-between"}>
        <div className={"flex h-fit items-center justify-center py-4"}>
          <div
            className={
              "flex w-full flex-col gap-y-3 md:flex-row md:justify-between"
            }
          >
            <EditFile fileId={fileId} fileName={data.file_name} />
            <ToolBar />
            <ShareSection />
          </div>
        </div>
        <div className={"h-12 w-full"}>
          <div className={"flex size-full items-center justify-end gap-4"}>
            <ZoomBtn />
            <UndoBtn />
          </div>
        </div>
      </div>
      <ToolBarAction />
      <div className={"absolute right-0 top-0 z-10 size-full"}></div>
    </main>
  );
};
export default File;
