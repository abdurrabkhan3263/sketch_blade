import React from "react";
import { Circle as CanvasCircle } from "react-konva";

interface CircleInterface {
  id: string;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: string;
  draggable: boolean;
  cornerRadius: number;
  fillPatternImage?: string;
  stroke: string;
  strokeWidth: number;
  text?: string;
}

const Circle: React.FC<CircleInterface> = ({ ...props }) => {
  return <CanvasCircle {...props} name={"shape"} />;
};
export default Circle;
