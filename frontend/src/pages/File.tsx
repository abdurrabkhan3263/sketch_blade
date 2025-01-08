import EditFile from "../components/file/EditFile.tsx";
import ToolBar from "../components/file/ToolBar.tsx";
import ShareSection from "../components/file/ShareSection.tsx";
import ZoomBtn from "../components/file/ZoomBtn.tsx";
import UndoBtn from "../components/file/UndoBtn.tsx";
import ToolBarAction from "../components/file/ToolBarAction.tsx";
import {useParams} from "react-router";
import {useEffect} from "react";
import axios from "axios";
import {useResponse} from "../hooks/useResponse.tsx";

const File = () => {
    const fileId = useParams().id

    const getFileQuery = async (clerkId) =>{
        return axios.get(`/api/file/${fileId}`,{
            headers:{
                Authorization:clerkId
            }
        })
    }

    const {data,isPending} = useResponse({
        queryKeys:[fileId as string],
        queryFn:getFileQuery,
    })

    useEffect(()=>{
        if(data){
            console.log(data)
        }
    },[data])

    return (
        <main className={"size-screen bg-primary text-quaternary px-10 relative"}>
            <div className={"size-full flex flex-col justify-between relative z-20"}>
                <div className={"py-4 h-fit flex justify-center items-center"}>
                    <div className={"w-full flex md:justify-between md:flex-row flex-col gap-y-3"}>
                        <EditFile fileId={fileId} />
                        <ToolBar/>
                        <ShareSection/>
                    </div>
                </div>
                <div className={'h-12 w-full'}>
                    <div className={"size-full flex justify-end items-center gap-4"}>
                            <ZoomBtn/>
                            <UndoBtn/>
                    </div>
                </div>
            </div>
            <ToolBarAction/>
            <div className={"absolute size-full top-0 right-0 z-10"}>
            </div>
        </main>
    )
}
export default File
