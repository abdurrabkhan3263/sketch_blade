import { KonvaEventObject } from "konva/lib/Node";
import { forwardRef } from "react";
import { Transformer } from "react-konva";
import Konva from "konva";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ToolBarElem } from "../../../lib/types";

interface CanvasTransformerProps {
  updateShape: (
    type: ToolBarElem,
    coordinates: {
      x2?: number;
      y2?: number;
      x?: number;
      y?: number;
      rotation?: number;
      scaleX?: number;
      scaleY?: number;
    },
    shapeId?: string,
  ) => void;
}

const CanvasTransformer: React.FC<CanvasTransformerProps> = forwardRef(
  ({ updateShape }, ref: React.ForwardedRef<Konva.Transformer>) => {
    const currentSelector = useSelector(
      (state: RootState) => state.app.currentToolBar,
    );

    const handleTrans = (e: KonvaEventObject<MouseEvent>) => {
      if (!e.currentTarget) return;
      const nodes = (e.currentTarget as Konva.Transformer).nodes();

      if (nodes.length === 0) return;

      nodes.forEach((node) => {
        const attrs = node.attrs;
        if (attrs) {
          updateShape(
            currentSelector,
            {
              rotation: attrs.rotation,
              scaleX: attrs.scaleX,
              scaleY: attrs.scaleY,
              x: attrs.x,
              y: attrs.y,
            },
            attrs.id,
          );
        }
      });
    };

    const handleDrag = (e: KonvaEventObject<MouseEvent>) => {
      if (!(e.target instanceof Konva.Transformer)) return;

      const transformer = e.target;
      const nodes = transformer.nodes();
      if (nodes.length > 0) {
        nodes.forEach((node) => {
          const attrs = node?.attrs;
          if (attrs) {
            updateShape(currentSelector, { x: attrs.x, y: attrs.y }, attrs.id);
          }
        });
      }
    };

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
        onTransform={handleTrans}
        onDragMove={handleDrag}
      />
    );
  },
);
export default CanvasTransformer;
