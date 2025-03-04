import React from "react";
import { Arrow as CanvasArrow } from "react-konva";
import { Shape } from "../../../lib/types";

const Arrow: React.FC<Shape> = ({ ...props }) => {
  return <CanvasArrow {...props} lineCap="round" name={"shape"} />;
};

export default Arrow;
