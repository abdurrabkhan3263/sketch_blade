import React from "react";
import Container from "../Container.tsx";
import {
  Opacity,
  Stroke,
  StrokeStyle,
  StrokeWidth,
} from "./ToolBarElements.tsx";

const FreeHand = () => {
  return (
    <>
      <Stroke />
      <StrokeStyle />
      <StrokeWidth />
      <Opacity />
    </>
  );
};
export default FreeHand;
