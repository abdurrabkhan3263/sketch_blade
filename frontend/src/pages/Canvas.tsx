import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { Group, Layer, Rect, Stage } from "react-konva";
import CanvasTransformer from "../components/file/CanvaElements/Transformer.tsx";
import Konva from "konva";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import { ToolBarArr } from "../lib/const.ts";
import { cn, getShapeUpdatedValue } from "../lib/utils.ts";
import { Coordinates, FourCoordinates, Shape, ToolBarElem } from "../lib/types";
import { GetDynamicShape } from "../lib/const.tsx";
import useShapeProperties from "../hooks/useShapeProperties.ts";
import { v4 as uuid } from "uuid";
import {
  changeCurrentToolBar,
  changeToolBarProperties,
  addShapes,
  deleteShapes,
  updateShapes,
  handleSelectedIds,
} from "../redux/slices/appSlice.ts";
import { KonvaEventObject } from "konva/lib/Node";

function Canvas() {
  const shapes = useSelector(
    (state: RootState) => state.app.shapes as Shape[] | [],
  );
  const selectedShapesId = useSelector(
    (state: RootState) => state.app.selectedShapesId,
  );
  const [currentShape, setCurrentShape] = useState<Shape>();
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [startingMousePos, setStartingMousePos] = useState<Coordinates>({
    x: 0,
    y: 0,
  });
  const currentSelector = useSelector(
    (state: RootState) => state.app.currentToolBar,
  );
  const selectionRect = useRef<Konva.Rect>(null);
  const transformerRef = createRef<Konva.Transformer>();
  const stageRef = useRef<Konva.Stage>(null);
  const shapeProperties = useShapeProperties();
  const dispatch = useDispatch();

  const addShapeIntoTheDb = (currentShape: Shape) => {
    localStorage.setItem(
      "shapes",
      JSON.stringify([...shapes, { ...currentShape }]),
    );
  };

  const initializeShape = (properties: any) => {
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
      if (updatedValue && updatedValue.isAddable) {
        setCurrentShape(
          (prev) =>
            ({
              ...prev,
              ...updatedValue,
            }) as Shape,
        );
      }
      addShapeIntoTheDb(currentShape as Shape);
    } else {
      dispatch(updateShapes({ type, coordinates, shapeId }));
      localStorage.setItem("shapes", JSON.stringify(shapes));
    }
  };

  const addShape = () => {
    if (!currentShape || (currentShape && !currentShape?.isAddable)) {
      return;
    }

    dispatch(addShapes(currentShape));

    setCurrentShape(undefined);
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

    if (e.target === stage) {
      const pos = stage.getPointerPosition();

      const transform = stage.getAbsoluteTransform().copy();

      const invertedTransform = transform.invert();
      const transformedPos = pos ? invertedTransform.point(pos) : null;
      const isNodesTheir = tr.nodes().length > 0;

      if (transformedPos) {
        if (currentSelector === "cursor") {
          selectionRectangle.width(0);
          selectionRectangle.height(0);
        } else if (ToolBarArr.includes(currentSelector)) {
          initializeShape({
            ...shapeProperties,
            x: Number(transformedPos.x),
            y: Number(transformedPos.y),
          });
        }
        setStartingMousePos({
          x: transformedPos.x,
          y: transformedPos.y,
        });
      }

      if (isNodesTheir && !metaPressed) {
        tr.nodes([]);
        dispatch(handleSelectedIds([]));
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

        dispatch(handleSelectedIds(ids));
        dispatch(changeToolBarProperties(nodesAttr));
      }

      if (currentSelector !== "cursor") {
        dispatch(changeCurrentToolBar("cursor"));
      }
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
    if (ToolBarArr.includes(currentSelector) && currentShape) {
      addShape();
    }

    setCurrentShape(undefined);
    setStartingMousePos({ x: 0, y: 0 });
    setIsDrawing(false);
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
          selected.length !== selectedShapesId.length
        ) {
          /* In here we add and remove the selected nodes */
          const ids = tr.nodes().map((shape) => shape.attrs?.id);
          const selectedShapes = selected.map((items) => items.attrs);
          tr.nodes(selected);
          dispatch(handleSelectedIds(ids));
          dispatch(changeToolBarProperties(selectedShapes));
        } else if (selected.length === 0) {
          tr.nodes([]);
          dispatch(handleSelectedIds([]));
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

  const handleDeleteShape = useCallback(() => {
    const ids = selectedShapesId;

    const filteredShape = shapes?.filter(
      (shape) => ids.indexOf(shape.id) === -1,
    );

    dispatch(deleteShapes(filteredShape));

    localStorage.setItem("shapes", JSON.stringify(filteredShape));
  }, [dispatch, selectedShapesId, shapes]);

  useEffect(() => {
    const handleshapedelete = (e: KeyboardEvent) => {
      if (selectedShapesId.length <= 0 || e.key !== "Delete") return;
      const tr = transformerRef.current;

      handleDeleteShape();

      if (tr) {
        tr.nodes([]);
      }
    };

    document.addEventListener("keydown", handleshapedelete);

    return () => {
      document.removeEventListener("keydown", handleshapedelete);
    };
  }, [handleDeleteShape, selectedShapesId, transformerRef]);

  useEffect(() => {
    const getShapesFromLocalStorage = JSON.parse(
      localStorage.getItem("shapes") || "[]",
    );

    if (getShapesFromLocalStorage && getShapesFromLocalStorage.length > 0) {
      dispatch(addShapes(getShapesFromLocalStorage));
    }
  }, [dispatch]);

  return (
    <div className="fixed right-1/2 top-0 z-20 size-full translate-x-1/2">
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        draggable={currentSelector === "hand"}
        className={cn(
          currentSelector === "hand" && "cursor-grab",
          ["circle", "rectangle"].indexOf(currentSelector) !== -1 &&
            selectedShapesId.length <= 0 &&
            "cursor-crosshair",
          isHovered && "cursor-move",
        )}
      >
        <Layer>
          <Group>
            {shapes.length > 0 &&
              shapes.map((element, index) => (
                <GetDynamicShape key={index} {...element} />
              ))}
            {currentShape && <GetDynamicShape {...currentShape} />}
          </Group>
          <Rect
            ref={selectionRect}
            fill={"rgba(147,146,146,0.22)"}
            stroke={"#bdbcf4"}
            strokeWidth={1}
            visible={false}
            listening={false}
          />
          <CanvasTransformer
            ref={transformerRef}
            handleTransformation={handleTrans}
            handleDragMove={handleDrag}
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default Canvas;
