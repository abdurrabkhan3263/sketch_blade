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
  // "point arrow": Circle,
  // arrow: Circle,
  // text: Circle,
  // upload: Circle,
};

const GetDynamicShape = ({ ...props }: Shape): ReactNode => {
  const Component = ListComponent[props.type];
  return Component ? <Component {...props} /> : <></>;
};

export { ToolBarElem, GetDynamicShape };
