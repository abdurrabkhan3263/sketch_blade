import React, { useEffect, useState } from "react";
import { Rect } from "react-konva";

interface RectangleProps {
  id: string;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: string;
  draggable: boolean;
  cornerRadius: number;
  fillPatternImage?: string;
  stroke: string;
  strokeWidth: number;
}

const Rectangle: React.FC<RectangleProps> = ({ ...props }) => {
  const reactRef = React.useRef(null);
  const [rotatingSnaps, setRotatingSnaps] = useState([]);

  const handleKeyPress = (e) => {
    if (e.key === "Control") {
      setRotatingSnaps([]);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Control") {
      setRotatingSnaps([]);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.addEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      <Rect ref={reactRef} name={"shape"} {...props} />
    </>
  );
};
export default Rectangle;
