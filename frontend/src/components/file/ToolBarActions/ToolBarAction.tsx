import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store.ts";
import Container from "./Container.tsx";
import Circle from "./ListToolBar/Circle.tsx";

const ToolBarAction = () => {
    const currentTool = useSelector((state:RootState) => state.app.currentToolBar);

    if (currentTool === 'cursor'){
        return <></>
    }

    return (
        <Container>
            <Circle />
        </Container>
    )
}
export default ToolBarAction
