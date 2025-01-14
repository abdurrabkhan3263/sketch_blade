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

const ToolBarAction = () => {
  const { currentToolBar, currentElement } = useSelector(
    (state: RootState) => state.app,
  );

  switch (currentToolBar) {
    case "circle":
      return <Circle />;
    case "rectangle":
      return <Rectangle />;
    case "text":
      return <Text />;
    case "eraser":
      return <Eraser />;
    case "free hand":
      return <FreeHand />;
    case "point arrow":
      return <PointedArrow />;
    case "arrow":
      return <Arrow />;
    default:
      return <></>;
  }
};
export default ToolBarAction;
