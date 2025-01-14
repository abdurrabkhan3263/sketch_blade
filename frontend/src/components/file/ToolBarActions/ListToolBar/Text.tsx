import React from "react";
import Container from "../Container.tsx";
import { FontFamily, FontSize, Opacity, Stroke } from "./ToolBarElements.tsx";

const Text = () => {
  return (
    <Container>
      <Stroke />
      <FontFamily />
      <FontSize />
      <Opacity />
    </Container>
  );
};
export default Text;
