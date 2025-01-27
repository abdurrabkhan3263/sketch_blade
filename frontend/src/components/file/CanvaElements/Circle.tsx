import React from "react";
import { Ellipse } from "react-konva";

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
  return <Ellipse {...props} strokeScaleEnabled={false} name={"shape"} />;
};
export default Circle;
