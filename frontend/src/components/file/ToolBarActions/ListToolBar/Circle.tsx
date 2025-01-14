import React from "react";
import {
  Background,
  Fill,
  Stroke,
  StrokeStyle,
  StrokeWidth,
  Opacity,
} from "./ToolBarElements.tsx";
import Container from "../Container.tsx";

const Circle = () => {
  return (
    <Container>
      <Background />
      <Stroke />
      <Fill />
      <StrokeStyle />
      <StrokeWidth />
      <Opacity />
    </Container>
  );
};
export default Circle;
