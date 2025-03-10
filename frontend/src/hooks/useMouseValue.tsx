import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Konva from "konva";

type MouseValue = {
  x: number;
  y: number;
};

const useMouseValue = ({
  stageRef,
}: {
  stageRef: React.RefObject<Konva.Stage>;
}): MouseValue | null => {
  const [mouseValue, setMouseValue] = useState<MouseValue | null>(null);
  const currentSelector = useSelector(
    (state: RootState) => state.app.currentToolBar,
  );

  useEffect(() => {
    if (currentSelector !== "eraser") return;
    const handleMouseMove = (e: MouseEvent) => {
      if (
        !e.target ||
        (e.target as HTMLElement)?.tagName !== "CANVAS" ||
        !stageRef.current
      )
        return;

      const stage = stageRef.current;

      const pos = stage?.getPointerPosition();

      const transform = stage?.getAbsoluteTransform().copy();

      const invertedTransform = transform?.invert();
      const transformedPos = pos ? invertedTransform?.point(pos) : null;

      setMouseValue(transformedPos);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      setMouseValue(null);
    };
  }, [currentSelector, stageRef]);

  return mouseValue;
};

export default useMouseValue;
