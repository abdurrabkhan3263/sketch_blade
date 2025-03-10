import React, { useCallback, useEffect, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { CanvasTransformer } from "../ShapesComponets";
import {
  Arrow,
  Coordinates,
  FourCoordinates,
  FreeHand,
  ToolBarElem,
} from "../../../lib/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import useShapeProperties from "../../../hooks/useShapeProperties";
import { cn, getCustomCursor, getShapeUpdatedValue } from "../../../lib/utils";
import { ToolBarArr } from "../../../lib/const";
import { Shape } from "../../../lib/types";
import { v4 as uuid } from "uuid";
import {
  addShapes,
  changeCurrentToolBar,
  changeToolBarProperties,
  handleSelectedIds,
  updateShapes,
} from "../../../redux/slices/appSlice";
import Eraser from "./Eraser";
import useMouseValue from "../../../hooks/useMouseValue";

interface StageProps {
  children: React.ReactNode;
  stageRef: React.RefObject<Konva.Stage>;
  transformerRef: React.RefObject<Konva.Transformer>;
  selectionRect: React.RefObject<Konva.Rect>;
  currentShape: Shape | undefined;
  setCurrentShape: React.Dispatch<React.SetStateAction<Shape | undefined>>;
}

const Canvas: React.FC<StageProps> = ({
  children,
  stageRef,
  transformerRef,
  selectionRect,
  currentShape,
  setCurrentShape,
}) => {
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [startingMousePos, setStartingMousePos] = useState<Coordinates>({
    x: 0,
    y: 0,
  });
  const shapeProperties = useShapeProperties();
  const dispatch = useDispatch();
  const selectedShapesId = useSelector(
    (state: RootState) => state.app.selectedShapesId,
  );
  const currentSelector = useSelector(
    (state: RootState) => state.app.currentToolBar,
  );
  const mouseMovementValue = useMouseValue({ stageRef });

  const addShape = useCallback(() => {
    if (!currentShape || (currentShape && !currentShape?.isAddable)) {
      return;
    }

    dispatch(addShapes(currentShape));
    setCurrentShape(undefined);
  }, [currentShape, dispatch, setCurrentShape]);

  const initializeShape = (
    properties: Record<string, string | number | any>,
  ) => {
    const id = uuid();
    setCurrentShape({
      id,
      ...properties,
      isAddable: false,
    } as Shape);
  };

  const updateShape = (
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
  ) => {
    coordinates = { ...startingMousePos, ...coordinates };

    if (!shapeId) {
      const updatedValue = getShapeUpdatedValue(
        type,
        coordinates as FourCoordinates,
      );

      if (
        ["free hand", "arrow", "point arrow"].includes(currentSelector) &&
        updatedValue?.isAddable
      ) {
        if (
          (currentSelector === "arrow" || currentSelector === "point arrow") &&
          (currentShape as Arrow)?.points?.length > 3
        ) {
          const updatedPoints = [...((currentShape as Arrow)?.points || [])];

          updatedPoints.splice(
            updatedPoints.length - 2,
            2,
            ...(updatedValue?.points?.slice(0, 2) || []),
          );

          setCurrentShape(
            (prev) =>
              ({
                ...prev,
                points: updatedPoints,
              }) as Shape,
          );
          return;
        }

        setCurrentShape(
          (prev) =>
            ({
              ...prev,
              points:
                currentSelector === "free hand"
                  ? [
                      ...((prev as Arrow | FreeHand)?.points || []),
                      ...(updatedValue.points || []),
                    ]
                  : [...(updatedValue?.points || [])],
              isAddable: true,
            }) as Shape,
        );

        return;
      }

      if (updatedValue && updatedValue.isAddable) {
        setCurrentShape(
          (prev) =>
            ({
              ...prev,
              ...updatedValue,
            }) as Shape,
        );
        // addShapeIntoTheDb(currentShape as Shape);
      }
    } else {
      dispatch(updateShapes({ type, coordinates, shapeId }));
    }
  };

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    e.evt.preventDefault();

    if (
      !stageRef?.current ||
      !selectionRect?.current ||
      !transformerRef.current
    )
      return;

    const stage = stageRef.current;
    const selectionRectangle = selectionRect.current;
    const tr = transformerRef.current;
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;

    const pos = stage.getPointerPosition();

    const transform = stage.getAbsoluteTransform().copy();

    const invertedTransform = transform.invert();
    const transformedPos = pos ? invertedTransform.point(pos) : null;

    if (!isDrawing) {
      if (e.target === stage) {
        const isNodesTheir = tr.nodes().length > 0;

        if (transformedPos) {
          if (currentSelector === "cursor") {
            selectionRectangle.width(0);
            selectionRectangle.height(0);
          } else if (ToolBarArr.includes(currentSelector)) {
            if (
              ["free hand", "arrow", "point arrow"].includes(currentSelector)
            ) {
              initializeShape({
                ...shapeProperties,
              });
            } else {
              initializeShape({
                ...shapeProperties,
                x: Number(transformedPos.x),
                y: Number(transformedPos.y),
              });
            }
          }

          setStartingMousePos({
            x: transformedPos.x,
            y: transformedPos.y,
          });
        }

        if (isNodesTheir && !metaPressed) {
          tr.nodes([]);
          dispatch(handleSelectedIds(null));
          dispatch(changeToolBarProperties(null));
        }

        setIsDrawing(true);
      } else if (e.target.hasName("shape")) {
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
        }

        if (Array.isArray(tr.nodes()) && tr.nodes().length > 0) {
          const nodesAttr = tr.nodes().map((shape) => shape.attrs);
          const ids = nodesAttr.map((attr) => attr.id);
          dispatch(handleSelectedIds({ id: ids, purpose: "FOR_EDITING" }));
          dispatch(changeToolBarProperties(nodesAttr));
        }

        if (currentSelector !== "cursor") {
          dispatch(
            changeCurrentToolBar({ toolBar: "cursor", isClicked: false }),
          );
        }
      }
    }

    if (isDrawing && currentSelector === "point arrow" && transformedPos) {
      (currentShape as Arrow)?.points?.push(...Object.values(transformedPos));
    }
  };

  const handleMouseUp = (e: KonvaEventObject<MouseEvent>) => {
    e.evt.preventDefault();
    const tr = transformerRef.current;

    if (!isDrawing || !tr) {
      return;
    }

    if (selectionRect.current && selectionRect.current.visible()) {
      selectionRect.current.visible(false);
    }

    if (
      ToolBarArr.includes(currentSelector) &&
      currentSelector !== "point arrow" &&
      currentShape
    ) {
      addShape();
    }

    if (currentSelector !== "point arrow") {
      setIsDrawing(false);
      setCurrentShape(undefined);
      setStartingMousePos({ x: 0, y: 0 });
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
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

    if (e.target.hasName("shape") && !isDrawing) {
      setIsHovered(true);
    } else if (!e.target.hasName("shape") && isHovered) {
      setIsHovered(false);
    }

    if (!isDrawing) {
      return;
    }

    const pos = stage.getPointerPosition();

    const transform = stage.getAbsoluteTransform().copy();

    const invertedTransform = transform.invert();
    const transformedPos = pos ? invertedTransform.point(pos) : null;

    if (transformedPos) {
      if (currentSelector === "cursor") {
        /* Here we implement the selection functionality */
        selectionRectangle.setAttrs({
          visible: true,
          x: Math.min(startingMousePos.x, transformedPos.x),
          y: Math.min(startingMousePos.y, transformedPos.y),
          width: Math.abs(transformedPos.x - startingMousePos.x),
          height: Math.abs(transformedPos.y - startingMousePos.y),
        });

        const shapes = stage.find(".shape");
        const box = selectionRectangle.getClientRect();
        const selected = shapes.filter((shape) =>
          Konva.Util.haveIntersection(box, shape.getClientRect()),
        );

        if (
          selected.length > 0 &&
          selected.length !== selectedShapesId?.id.length
        ) {
          /* In here we add and remove the selected nodes */
          const ids = selected.map((shape) => shape.attrs.id);
          const selectedShapes = selected.map((items) => items.attrs);
          tr.nodes(selected);

          dispatch(handleSelectedIds({ id: ids, purpose: "FOR_EDITING" }));
          dispatch(changeToolBarProperties(selectedShapes));
        } else if (selected.length === 0) {
          tr.nodes([]);
          dispatch(handleSelectedIds(null));
          dispatch(changeToolBarProperties(null));
        }
      } else if (ToolBarArr.includes(currentSelector)) {
        /* this function is call when we are going to add new shape */
        updateShape(currentSelector, {
          x2: transformedPos.x,
          y2: transformedPos.y,
        });
      }
    }
  };

  useEffect(() => {
    if (!isDrawing || currentSelector !== "point arrow") return;

    const handleMouseEnter = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;

      const points = (currentShape as Arrow)?.points || [];
      const slicedPoints = points?.slice(0, points?.length - 2);

      if (slicedPoints.length > 2) {
        setCurrentShape(
          (prev) =>
            ({
              ...prev,
              points: slicedPoints,
            }) as Shape,
        );

        addShape();
      }

      setIsDrawing(false);
      setCurrentShape(undefined);
      setStartingMousePos({ x: 0, y: 0 });
    };

    document.addEventListener("keydown", handleMouseEnter);

    return () => {
      document.removeEventListener("keydown", handleMouseEnter);
    };
  }, [isDrawing, currentSelector, setCurrentShape, addShape, currentShape]);

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      draggable={currentSelector === "hand"}
      className={cn(getCustomCursor(currentSelector, isHovered))}
    >
      <Layer>
        {children}
        <Rect
          ref={selectionRect}
          fill={"rgba(147,146,146,0.22)"}
          stroke={"#bdbcf4"}
          strokeWidth={1}
          visible={false}
          listening={false}
        />

        <CanvasTransformer ref={transformerRef} updateShape={updateShape} />
        {mouseMovementValue && currentSelector === "eraser" && (
          <Eraser movementValue={mouseMovementValue} stageRef={stageRef} />
        )}
      </Layer>
    </Stage>
  );
};

export default Canvas;
