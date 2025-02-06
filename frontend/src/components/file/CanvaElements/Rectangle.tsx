import React, { useEffect, useState } from "react";
import { Rect, Text } from "react-konva";

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
  text?: string;
}

const Rectangle: React.FC<RectangleProps> = ({ ...props }) => {
  const reactRef = React.useRef(null);
  const [rotatingSnaps, setRotatingSnaps] = useState([]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Control") {
      setRotatingSnaps([]);
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "Control") {
      setRotatingSnaps([]);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      <Rect
        ref={reactRef}
        {...props}
        strokeScaleEnabled={false}
        name={"shape"}
      />
      <Text
        text={props.text}
        height={props.height}
        width={props.width}
        draggable={props.draggable}
      />
    </>
  );
};

export default Rectangle;
