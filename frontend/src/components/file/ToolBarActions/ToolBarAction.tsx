import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store.ts";
import {
  Circle,
  Eraser,
  PointedArrow,
  FreeHand,
  Text,
  Rectangle,
  Arrow,
} from "../ToolBarActions/ListToolBar";
import Container from "./Container.tsx";

const ToolBarAction = () => {
  const { currentToolBar } = useSelector((state: RootState) => state.app);

  if (currentToolBar === "cursor") {
    return <></>;
  }
  const toolComponents: { [key: string]: React.ReactNode } = {
    circle: <Circle />,
    rectangle: <Rectangle />,
    text: <Text />,
    eraser: <Eraser />,
    "free hand": <FreeHand />,
    "point arrow": <PointedArrow />,
    arrow: <Arrow />,
  };

  return <Container>{toolComponents[currentToolBar] || null}</Container>;
};
export default ToolBarAction;
