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

      // TODO: WE HAVE TO REFACTOR THIS.

      if (selected.length <= 0) return;

      if (
        !Array.isArray(selectedIds?.id) ||
        !selectedIds.id.includes(selected[0].id())
      ) {
        dispatch(
          handleSelectedIds({
            id: selected[0].id(),
            purpose: "FOR_DELETING",
          }),
        );
        return;
      } else if (!selectedIds.id.includes(selected[selected.length - 1].id())) {
        dispatch(
          handleSelectedIds({
            id: selected[selected.length - 1].id(),
            purpose: "FOR_DELETING",
          }),
        );
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
