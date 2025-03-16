import { GrCursor } from "react-icons/gr";
import { GoArrowDown, GoCircle } from "react-icons/go";
import { PiRectangle } from "react-icons/pi";
import { FaEraser, FaPencilAlt } from "react-icons/fa";
import { RiText } from "react-icons/ri";
import { BsArrow90DegDown } from "react-icons/bs";
import {
  Rectangle,
  Circle,
  FreeHand,
} from "../components/file/ShapesComponets";
import { FaHand } from "react-icons/fa6";
import { Shape, ShapesElements } from "./types";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Arrow from "../components/file/ShapesComponets/Arrow";
import { CanvasUtils } from "./utils";

const ToolBarElem = [
  {
    name: "hand",
    icon: <FaHand />,
  },
  {
    name: "cursor",
    icon: <GrCursor />,
  },
  {
    name: "circle",
    icon: <GoCircle />,
  },
  {
    name: "rectangle",
    icon: <PiRectangle />,
  },
  {
    name: "free hand",
    icon: <FaPencilAlt />,
  },
  {
    name: "text",
    icon: <RiText />,
  },
  {
    name: "eraser",
    icon: <FaEraser />,
  },
  {
    name: "arrow",
    icon: <GoArrowDown />,
  },
  {
    name: "point arrow",
    icon: <BsArrow90DegDown />,
  },
];

const ListComponent: { [key in ShapesElements]: React.ComponentType<Shape> } = {
  rectangle: Rectangle,
  circle: Circle,
  "free hand": FreeHand,
  "point arrow": Arrow,
  arrow: Arrow,
  text: Circle,
  upload: Circle,
};

const GetDynamicShape = ({ ...props }: Shape): ReactNode => {
  const { currentToolBar, selectedShapesId } = useSelector(
    (state: RootState) => state.app,
  );
  const Component = ListComponent[props.type];
  const updatedProps = CanvasUtils.updatedProps(
    props,
    currentToolBar,
    selectedShapesId,
  );

  return Component ? <Component {...updatedProps} /> : <></>;
};

export { ToolBarElem, GetDynamicShape };
