import React, { useEffect, useState } from "react";
import { Rect, Text } from "react-konva";
import { Shape } from "../../../lib/types";

const Rectangle: React.FC<Shape> = ({ ...props }) => {
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
      {/* <Text
        text={"hello world"}
        height={props.height}
        width={props.width}
        fontSize={50}
        draggable={true}
        x={props.x / 2}
        y={props.y / 2}
      /> */}
    </>
  );
};

export default Rectangle;
