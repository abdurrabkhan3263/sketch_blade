import React, { forwardRef } from "react";
import { Transformer } from "react-konva";

const CanvasTransformer = forwardRef((props, ref) => {
  return (
    <Transformer
      ref={ref}
      anchorCornerRadius={1.5}
      anchorSize={9}
      rotateLineVisible={false}
      anchorFill={"#1b262c"}
      anchorStyleFunc={(anchor) => {
        const node = anchor?.getParent()?.getNode();

        if (!node) return;

        if (anchor.hasName("top-center") || anchor.hasName("bottom-center")) {
          anchor.height(6);
          anchor.width(30);
          anchor.opacity(0);
        }

        // For middle anchors - full height
        if (anchor.hasName("middle-left") || anchor.hasName("middle-right")) {
          anchor.height(30);
          anchor.width(6);
          anchor.opacity(0);
        }

        // For rotating anchor (top-right corner)
        if (anchor.hasName("rotater")) {
          anchor.cornerRadius(8);
        }
      }}
    />
  );
});
export default CanvasTransformer;
