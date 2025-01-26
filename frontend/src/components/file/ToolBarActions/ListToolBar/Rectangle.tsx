import React from "react";
import {
  Fill,
  Opacity,
  Stroke,
  StrokeStyle,
  StrokeWidth,
  EdgeStyle,
  FillStyle,
} from "./ToolBarElements.tsx";

const Rectangle = () => {
  return (
    <>
      <Fill />
      <Stroke />
      <FillStyle />
      <StrokeStyle />
      <StrokeWidth />
      <EdgeStyle />
      <Opacity />
    </>
  );
};
export default Rectangle;
