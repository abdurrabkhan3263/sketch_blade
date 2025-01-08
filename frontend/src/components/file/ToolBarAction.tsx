import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";

const ToolBarAction = () => {
    const currentTool = useSelector((state:RootState) => state.app.currentToolBar);

    if (currentTool === 'cursor' || currentTool === "eraser"){
        return <></>
    }

    return (
        <div className={"absolute left-8 top-1/4 translate-y-1/4 bg-blue-500"}>
            {
                currentTool
            }
        </div>
    )
}
export default ToolBarAction
