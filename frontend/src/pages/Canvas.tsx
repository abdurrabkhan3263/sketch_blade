import React, { createRef, useEffect, useRef, useState } from "react";
import { Layer, Rect, Stage } from "react-konva";
import CanvasTransformer from "../components/file/CanvaElements/Transformer.tsx";
import Konva from "konva";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import { v4 as uuidv4 } from "uuid";
import { ListComponents } from "../lib/const.tsx";
import { ToolBarArr } from "../lib/const.ts";

function Canvas() {
  const [canvasElement, setCanvasElement] = useState([]);
  const selectionRect = useRef(null);
  const stageRef = useRef(null);
  const transformerRef = createRef();
  let selecting = false;
  let x1: number, y1: number, x2: number, y2: number;
  const currentSelector = useSelector(
    (state: RootState) => state.app.currentToolBar,
  );

  const addElement = (element) => {
    const { x1, x2, y1, y2 } = element;
    const newElement = {
      id: uuidv4(),
      type: currentSelector,
      x: Math.min(x1, x2),
      y: Math.min(y1, y2),
      width: Math.abs(x2 - x1),
      height: Math.abs(y2 - y1),
    };
    setCanvasElement((prev) => [...prev, newElement]);
  };

  useEffect(() => {
    if (
      !stageRef?.current ||
      !selectionRect?.current ||
      !transformerRef.current
    )
      return;

    const stage = stageRef.current;
    const selectionRectangle = selectionRect.current;
    const tr = transformerRef.current;

    stage.on("mousedown touchstart", (e) => {
      if (e.target !== stage) {
        return;
      }

      e.evt.preventDefault();

      x1 = stage.getPointerPosition()?.x || 0;
      y1 = stage.getPointerPosition()?.y || 0;
      x2 = stage.getPointerPosition()?.x || 0;
      y2 = stage.getPointerPosition()?.y || 0;

      selecting = true;

      if (currentSelector === "cursor") {
        selectionRectangle.width(0);
        selectionRectangle.height(0);
      }
    });

    stage.on("mousemove touchmove", (e) => {
      if (!selecting) {
        return;
      }

      e.evt.preventDefault();
      x2 = stage.getPointerPosition().x;
      y2 = stage.getPointerPosition().y;

      if (selecting && currentSelector === "cursor") {
        selectionRectangle.setAttrs({
          visible: true,
          x: Math.min(x1, x2),
          y: Math.min(y1, y2),
          width: Math.abs(x2 - x1),
          height: Math.abs(y2 - y1),
        });

        const shapes = stage.find(".shape");
        const box = selectionRectangle.getClientRect();
        const selected = shapes.filter((shape) =>
          Konva.Util.haveIntersection(box, shape.getClientRect()),
        );
        tr.nodes(selected);
      } else if (ToolBarArr.includes(currentSelector)) {
      }
    });

    stage.on("mouseup touchend", (e) => {
      if (!selecting) {
        return;
      }
      if (selectionRectangle.visible()) {
        selectionRectangle.visible(false);
      }
      selecting = false;
    });

    stage.on("click tap", function (e) {
      if (selectionRectangle.visible()) {
        return;
      }

      if (e.target === stage) {
        tr.nodes([]);
        return;
      }

      if (!e.target.hasName("shape")) {
        return;
      }

      const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
      const isSelected = tr.nodes().indexOf(e.target) >= 0;

      if (!metaPressed && !isSelected) {
        tr.nodes([e.target]);
      } else if (metaPressed && isSelected) {
        const nodes = tr.nodes().slice();
        nodes.splice(nodes.indexOf(e.target), 1);
        tr.nodes(nodes);
      } else if (metaPressed && !isSelected) {
        const nodes = tr.nodes().concat([e.target]);
        tr.nodes(nodes);
      } else {
        tr.nodes([]);
      }
    });

    return () => {
      stage.off("mousedown touchstart");
      stage.off("mousemove touchmove");
      stage.off("mouseup touchend");
      stage.off("click tap");
    };
  }, [stageRef, currentSelector]);

  useEffect(() => {
    console.log(canvasElement);
  }, [canvasElement]);

  return (
    <div className="fixed right-1/2 top-0 z-20 size-full translate-x-1/2">
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <Layer>
          {/*{canvasElement.length > 0 &&*/}
          {/*  canvasElement.map((element) => {*/}
          {/*    const { type, ...props } = element;*/}
          {/*    const Component = ListComponents[type];*/}
          {/*    return <Component {...props} />;*/}
          {/*  })}*/}
          <Rect
            ref={selectionRect}
            fill={"rgba(147,146,146,0.22)"}
            cornerRadius={8}
            stroke={"#ffffff"}
            strokeWidth={1}
            visible={false}
            listening={false}
          />
          <CanvasTransformer ref={transformerRef} />
        </Layer>
      </Stage>
    </div>
  );
}

export default Canvas;
