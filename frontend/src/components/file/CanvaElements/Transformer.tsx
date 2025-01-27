import { forwardRef } from "react";
import { Transformer } from "react-konva";

interface CanvasTransformerProps {
  handleTransformation: (e: any) => void;
  handleTransformationStart: (e: any) => void;
  handleTransformationEnd: (e: any) => void;
  handleDragMove: (e: any) => void;
}

const CanvasTransformer = forwardRef(
  (
    {
      handleTransformationEnd,
      handleTransformation,
      handleTransformationStart,
      handleDragMove,
    }: CanvasTransformerProps,
    ref,
  ) => {
    return (
      <Transformer
        ref={ref}
        anchorCornerRadius={1.5}
        anchorSize={9}
        rotateLineVisible={false}
        anchorFill={"#1b262c"}
        ignoreStroke={true}
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
        onTransform={handleTransformation}
        onTransformStart={handleTransformationStart}
        onTransformEnd={handleTransformationEnd}
        onDragMove={handleDragMove}
      />
    );
  },
);
export default CanvasTransformer;
