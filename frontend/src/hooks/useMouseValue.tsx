import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type MouseValue = {
  x: number;
  y: number;
};

const useMouseValue = (): MouseValue | null => {
  const [mouseValue, setMouseValue] = useState<MouseValue | null>(null);
  const currentSelector = useSelector(
    (state: RootState) => state.app.currentToolBar,
  );

  useEffect(() => {
    if (currentSelector !== "eraser") return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!e.target || (e.target as HTMLElement)?.tagName !== "CANVAS") return;

      const { clientX, clientY } = e;

      setMouseValue({ x: clientX, y: clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      setMouseValue(null);
    };
  }, [currentSelector]);

  return mouseValue;
};

export default useMouseValue;
