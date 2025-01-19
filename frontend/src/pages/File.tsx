import React, { useEffect } from "react";
import EditFile from "../components/file/EditFile.tsx";
import ToolBar from "../components/file/ToolBar.tsx";
import ShareSection from "../components/file/ShareSection.tsx";
import ZoomBtn from "../components/file/ZoomBtn.tsx";
import UndoBtn from "../components/file/UndoBtn.tsx";
import ToolBarAction from "../components/file/ToolBarActions/ToolBarAction.tsx";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useResponse } from "../hooks/useResponse.tsx";
import { Loader2, MenuIcon } from "lucide-react";
import { File as FileType } from "../lib/types";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import Canvas from "./Canvas.tsx";

const File = () => {
  const fileId = useParams().id;
  const navigate = useNavigate();

  const {
    data,
    isPending,
    isError,
    error,
  }: { data: FileType; isPending: boolean } = useResponse({
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
    if (isError) {
      if (error?.response?.status === 404) {
        navigate("/404");
      } else if (
        error?.response?.status == 400 ||
        error?.response?.status === 403
      ) {
        navigate("/");
      }
    }
  }, [isError, error, data]);

  if (isPending)
    return (
      <div className={"size-screen flex-center bg-primary"}>
        <Loader2 size={64} className={"animate-spin text-quaternary"} />
      </div>
    );

  return (
    <main
      className={
        "size-screen relative bg-primary px-2 py-2 text-quaternary md:px-6 lg:px-10"
      }
    >
      <div className={"relative z-20 flex size-full flex-col justify-between"}>
        <div className={"flex h-fit items-center justify-center"}>
          <div
            className={
              "relative z-50 flex w-full flex-col gap-y-3 md:flex-row md:justify-between"
            }
          >
            <EditFile fileId={fileId as string} fileName={"fuck"} />
            <ToolBar />
            <ShareSection />
          </div>
        </div>
        <div className={"relative size-full flex-1"}>
          <ToolBarAction />
          <Canvas />
        </div>
        <div className={"relative z-50 h-12 w-full"}>
          <div
            className={
              "hidden size-full items-center justify-end gap-4 md:flex"
            }
          >
            <ZoomBtn />
            <UndoBtn />
          </div>
          <div
            className={"flex size-full rounded-lg bg-secondary p-2 md:hidden"}
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size={"icon"}>
                  <MenuIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Dimensions</h4>
                    <p className="text-muted-foreground text-sm">
                      Set the dimensions for the layer.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="width">Width</Label>
                      <Input
                        id="width"
                        defaultValue="100%"
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxWidth">Max. width</Label>
                      <Input
                        id="maxWidth"
                        defaultValue="300px"
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="height">Height</Label>
                      <Input
                        id="height"
                        defaultValue="25px"
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxHeight">Max. height</Label>
                      <Input
                        id="maxHeight"
                        defaultValue="none"
                        className="col-span-2 h-8"
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </main>
  );
};
export default File;
