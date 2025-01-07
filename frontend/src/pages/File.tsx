import EditFile from "../components/file/EditFile.tsx";
import ToolBar from "../components/file/ToolBar.tsx";
import ShareSection from "../components/file/ShareSection.tsx";
import ZoomBtn from "../components/file/ZoomBtn.tsx";
import UndoBtn from "../components/file/UndoBtn.tsx";

const File = () => {
    return (
        <main className={"size-screen bg-primary text-quaternary px-10"}>
            <div className={"size-full flex flex-col"}>
                <div className={"py-4 h-fit flex justify-center items-center"}>
                    <div className={"w-full flex md:justify-between md:flex-row flex-col gap-y-3"}>
                        <EditFile/>
                        <ToolBar/>
                        <ShareSection/>
                    </div>
                </div>
                <div className={"flex-1 bg-secondary rounded-md"}>
                </div>
                <div className={'h-12 w-full'}>
                    <div className={"size-full flex justify-end items-center gap-4"}>
                            <ZoomBtn/>
                            <UndoBtn/>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default File
