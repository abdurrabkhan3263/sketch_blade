import React, { createRef, useEffect, useRef, useState } from "react";
import { Layer, Rect, Stage } from "react-konva";
import CanvasTransformer from "../components/file/CanvaElements/Transformer.tsx";
import Konva from "konva";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import { ToolBarArr } from "../lib/const.ts";
import { getShapeUpdatedValue } from "../lib/utils.ts";
import { Coordinates, ToolBarElem } from "../lib/types";
import { GetDynamicShape } from "../lib/const.tsx";
import useShapeProperties from "../hooks/useShapeProperties.ts";
import { v4 as uuid } from "uuid";

function Canvas() {
  const [shapes, setShapesElement] = useState([]);
  const [currentShape, setCurrentShape] = useState();
  const [isDrawing, setIsDrawing] = useState(false);
  const [startingMousePos, setStartingMousePos] = useState({
    x: 0,
    y: 0,
  });
  const [selectedId, setSelectedId] = useState("");
  const currentSelector = useSelector(
    (state: RootState) => state.app.currentToolBar,
  );
  const selectionRect = useRef(null);
  const transformerRef = createRef();
  const stageRef = useRef();
  const shapeProperties = useShapeProperties();

  const startDrawing = (properites) => {
    setCurrentShape({
      id: uuid(),
      ...properites,
      isAddable: false,
    });
  };

  const updateShape = (type: ToolBarElem, coordinates: Coordinates) => {
    const updatedValue = getShapeUpdatedValue(type, coordinates);
    setCurrentShape((prev) => ({
      ...prev,
      ...updatedValue,
    }));
  };

  const addShape = () => {
    if (!currentShape || (currentShape && !currentShape?.isAddable)) {
      return;
    }

    let isAlreadyExits = shapes.some((items) => items.id === currentShape.id);

    if (isAlreadyExits) {
      setShapesElement((prevShapes) =>
        prevShapes.map((shape) =>
          shape.id === currentShape.id ? currentShape : shapes,
        ),
      );
    } else {
      const { isAddable, ...properties } = currentShape;
      setShapesElement((prev) => [...prev, properties]);
    }
  };

  const handleMouseDown = (e) => {
    e.evt.preventDefault();

    if (
      !stageRef?.current ||
      !selectionRect?.current ||
      !transformerRef.current
    )
      return;

    const stage = stageRef.current;
    const selectionRectangle = selectionRect.current;

    if (e.target !== stage) return;

    const pointerPos = stage.getPointerPosition();

    if (pointerPos) {
      if (currentSelector === "cursor") {
        selectionRectangle.width(0);
        selectionRectangle.height(0);
      } else if (ToolBarArr.includes(currentSelector)) {
        startDrawing({
          ...shapeProperties,
          x: pointerPos.x,
          y: pointerPos.y,
        });
      }
      setStartingMousePos({
        x: pointerPos.x,
        y: pointerPos.y,
      });
    }
    setIsDrawing(true);
  };

  const handleMouseUp = (e) => {
    e.evt.preventDefault();

    if (!isDrawing) {
      return;
    }

    if (selectionRect.current && selectionRect.current.visible()) {
      selectionRect.current.visible(false);
    }
    if (ToolBarArr.includes(currentSelector) && currentShape) {
      addShape();
    }
    setCurrentShape();
    setStartingMousePos({ x: 0, y: 0 });
    setIsDrawing(false);
  };

  const handleMouseMove = (e) => {
    if (
      !selectionRect?.current ||
      !stageRef.current ||
      !transformerRef.current
    ) {
      return;
    }

    const stage = stageRef.current;
    const selectionRectangle = selectionRect.current;
    const tr = transformerRef.current;

    e.evt.preventDefault();

    if (!isDrawing) {
      return;
    }

    const pointerPos = stage.getPointerPosition();

    if (pointerPos) {
      if (currentSelector === "cursor") {
        selectionRectangle.setAttrs({
          visible: true,
          x: Math.min(startingMousePos.x, pointerPos.x),
          y: Math.min(startingMousePos.y, pointerPos.y),
          width: Math.abs(pointerPos.x - startingMousePos.x),
          height: Math.abs(pointerPos.y - startingMousePos.y),
        });

        const shapes = stage.find(".shape");
        const box = selectionRectangle.getClientRect();
        const selected = shapes.filter((shape) =>
          Konva.Util.haveIntersection(box, shape.getClientRect()),
        );
        tr.nodes(selected);
      } else if (ToolBarArr.includes(currentSelector)) {
        updateShape(currentSelector, {
          ...startingMousePos,
          x2: pointerPos.x,
          y2: pointerPos.y,
        });
      }
    }
  };

  const handleStageClick = (e) => {
    if (!transformerRef.current || !selectionRect.current || !stageRef.current)
      return;

    const selectionRectangle = selectionRect.current;
    const tr = transformerRef.current;
    const stage = stageRef.current;

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
  };

  const handleBoundBox = (e) => {
    console.log(e);
  };

  return (
    <div className="fixed right-1/2 top-0 z-20 size-full translate-x-1/2">
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleStageClick}
      >
        <Layer>
          {shapes.length > 0 &&
            shapes.map((element, index) => (
              <GetDynamicShape key={index} {...element} />
            ))}
          {currentShape && <GetDynamicShape {...currentShape} />}
          <Rect
            ref={selectionRect}
            fill={"rgba(147,146,146,0.22)"}
            cornerRadius={8}
            stroke={"#ffffff"}
            strokeWidth={1}
            visible={false}
            listening={false}
          />
          <CanvasTransformer
            ref={transformerRef}
            handleBoundBox={handleBoundBox}
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default Canvas;
