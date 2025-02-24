import Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { Rect } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  deleteShapes,
  handleSelectedIds,
} from "../../../redux/slices/appSlice";

type MouseValue = {
  movementValue: {
    x: number;
    y: number;
  };
  stageRef: React.RefObject<Konva.Stage>;
};

const Eraser: React.FC<MouseValue> = ({ movementValue, stageRef }) => {
  const [isPressed, setIsPressed] = useState(false);
  const eraserRef = useRef<Konva.Rect>(null);
  const selectedIds = useSelector(
    (state: RootState) => state.app.selectedShapesId,
  );
  const dispatch = useDispatch();
  const eraserProperties = useSelector(
    (state: RootState) => state.app.toolBarProperties?.eraserRadius,
  );

  useEffect(() => {
    const handleEraser = () => {
      const stage = stageRef.current;
      const eraser = eraserRef.current;

      if (!stage || !eraser || !isPressed) return;

      const shapes = stage.find(".shape");
      const selected = shapes.filter((shape) =>
        Konva.Util.haveIntersection(
          eraser.getClientRect(),
          shape.getClientRect(),
        ),
      );

      if (selected && selected.length > 0) {
        const selectedId = selected[selected.length - 1].attrs.id;

        if (selectedIds.includes(selectedId)) return;

        dispatch(handleSelectedIds(selectedId));
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!e.target) return;

      if ((e.target as HTMLElement).tagName === "CANVAS") {
        setIsPressed(true);
      }
    };

    const handleMouseUp = () => {
      dispatch(deleteShapes());
      setIsPressed(false);
    };

    document.addEventListener("mousemove", handleEraser);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleEraser);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [stageRef, isPressed, selectedIds, dispatch]);

  return (
    <Rect
      ref={eraserRef}
      height={eraserProperties}
      width={eraserProperties}
      fill={"#0a1f2c"}
      stroke={"#3282B8"}
      strokeWidth={1}
      cornerRadius={999}
      name="eraser"
      {...movementValue}
    />
  );
};

export default Eraser;
