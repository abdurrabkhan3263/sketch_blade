import { GrCursor } from "react-icons/gr";
import { GoArrowDown, GoCircle } from "react-icons/go";
import { PiRectangle } from "react-icons/pi";
import { FaEraser, FaPencilAlt } from "react-icons/fa";
import { RiText } from "react-icons/ri";
import { BsArrow90DegDown } from "react-icons/bs";
import { Rectangle, Circle } from "../components/file/CanvaElements";

const ToolBarElem = [
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

const ListComponent = {
  rectangle: Rectangle,
  circle: Circle,
};

const GetDynamicShape = ({ ...props }): ReactNode => {
  const Component: React.ReactElement = ListComponent[props.type];
  return Component ? <Component {...props} /> : <></>;
};

export { ToolBarElem, GetDynamicShape };
