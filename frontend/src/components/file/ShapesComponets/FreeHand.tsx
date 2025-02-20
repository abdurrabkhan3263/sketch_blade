import Konva from "konva";
import React, { useRef } from "react";
import { Line } from "react-konva";
import { Shape } from "../../../lib/types";

const FreeHand: React.FC<Shape> = ({ ...props }) => {
  const lineRef = useRef<Konva.Line>(null);

  return <Line ref={lineRef} {...props} name="shape" draggable />;
};

export default FreeHand;
