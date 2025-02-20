import { useCallback, useEffect, useRef, useState } from "react";
import { Group } from "react-konva";
import Konva from "konva";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";
import { Shape } from "../../lib/types/index.ts";
import { GetDynamicShape } from "../../lib/const.tsx";
import { addShapes, deleteShapes } from "../../redux/slices/appSlice.ts";
import Canvas from "./CanvasElements/Canvas.tsx";

interface CanvasProps {
  transformerRef: React.RefObject<Konva.Transformer>;
  stageRef: React.RefObject<Konva.Stage>;
}

function CanvasCompo({ stageRef, transformerRef }: CanvasProps) {
  const [currentShape, setCurrentShape] = useState<Shape>();
  const shapes = useSelector(
    (state: RootState) => state.app.shapes as Shape[] | [],
  );
  const selectedShapesId = useSelector(
    (state: RootState) => state.app.selectedShapesId,
  );
  const selectionRect = useRef<Konva.Rect>(null);
  const dispatch = useDispatch();

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
      <Canvas
        transformerRef={transformerRef}
        selectionRect={selectionRect}
        stageRef={stageRef}
        currentShape={currentShape}
        setCurrentShape={setCurrentShape}
      >
        <Group>
          {Array.isArray(shapes) &&
            shapes.length > 0 &&
            shapes.map((element, index) => (
              <GetDynamicShape key={index} {...element} />
            ))}
          {currentShape && <GetDynamicShape {...currentShape} />}
        </Group>
      </Canvas>
    </div>
  );
}

export default CanvasCompo;
