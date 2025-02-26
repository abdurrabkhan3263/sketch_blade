import { useCallback, useEffect, useRef, useState } from "react";
import { Group } from "react-konva";
import Konva from "konva";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";
import { Shape } from "../../lib/types/index.ts";
import { GetDynamicShape } from "../../lib/const.tsx";
import {
  addShapes,
  changeToolBarProperties,
  deleteShapes,
  handleSelectedIds,
} from "../../redux/slices/appSlice.ts";
import Canvas from "./CanvasElements/Canvas.tsx";
import { getAllShapes } from "../../lib/action/shape.action.ts";

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

  useEffect(() => {
    const handleshapedelete = (e: KeyboardEvent) => {
      if (selectedShapesId.length <= 0 || e.key !== "Delete") return;
      const tr = transformerRef.current;

      dispatch(deleteShapes());

      tr?.nodes([]);
      dispatch(handleSelectedIds([]));
      dispatch(changeToolBarProperties(null));
    };

    document.addEventListener("keydown", handleshapedelete);

    return () => {
      document.removeEventListener("keydown", handleshapedelete);
    };
  }, [dispatch, selectedShapesId, shapes, transformerRef]);

  useEffect(() => {
    const allShapes = getAllShapes();

    if (Array.isArray(allShapes) && allShapes.length > 0) {
      dispatch(addShapes(allShapes));
    }
  }, [dispatch]);

  // TODO : SO I WANT TO USE INDEX DB WHEN THE USE DOES NOT LOGGED IN AND WHEN USER FINALLY WANT TO LOGGED IN AND MAKE SOME FILE THEN WE CAN SHOW ALL THE ELEMENTS WHICH USER MAKE WHEN THEY DOES NOT LOGGED IN. WE SHOW POP UP AND SAY IT DO YOU WANT TO MERGE IT. IF YES CAN WE CAN MERGE PREVIOUS ONE DATA.

  // TODO: IMPLEMENT : ALSO IMPLEMENT ARROW.

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
