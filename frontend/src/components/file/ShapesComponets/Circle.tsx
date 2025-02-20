import React from "react";
import { Ellipse } from "react-konva";
import { Shape } from "../../../lib/types";

const Circle: React.FC<Shape> = ({ ...props }) => {
  return <Ellipse {...props} strokeScaleEnabled={false} name={"shape"} />;
};
export default Circle;
