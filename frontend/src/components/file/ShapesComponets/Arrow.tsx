import React from "react";
import { Arrow as CanvasArrow } from "react-konva";
import { Arrow as ArrowType } from "../../../lib/types";

const Arrow: React.FC<ArrowType> = ({ ...props }) => {
  return (
    <CanvasArrow
      {...props}
      fill={"black"}
      stroke={"black"}
      strokeWidth={4}
      pointerLength={20}
      pointerWidth={20}
      lineCap="round"
      name={"shape"}
    />
  );
};

export default Arrow;
