import Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { Rect } from "react-konva";

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
  const [selectedToDelete, setSelectedToDelete] = useState<string[]>([]);

  useEffect(() => {
    const handleEraser = (e: MouseEvent) => {
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
        const selectedShapeSet = new Set(selectedToDelete);
        const selectedId = selected[selected.length - 1].attrs.id;

        if (selectedShapeSet.has(selectedId)) return;

        setSelectedToDelete((prev) => [...prev, selectedId]);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!e.target) return;

      if ((e.target as HTMLElement).tagName === "CANVAS") {
        setIsPressed(true);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!e?.target) return;

      if (selectedToDelete.length) {
        console.log("hello", selectedToDelete);
        setSelectedToDelete([]);
      }

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
  }, [stageRef, isPressed, selectedToDelete]);

  useEffect(() => {
    console.log(selectedToDelete);
  }, [selectedToDelete]);

  return (
    <Rect
      ref={eraserRef}
      height={15}
      width={15}
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
