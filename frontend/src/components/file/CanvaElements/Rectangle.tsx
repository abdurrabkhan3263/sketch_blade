import React, { useEffect, useState } from "react";
import { Rect, Transformer } from "react-konva";
import { MAX_WIDTH, MAX_HEIGHT } from "../../../lib/const.ts";

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

const Rectangle: React.FC<RectangleProps> = ({
  id,
  x,
  y,
  height,
  width,
  fill,
  draggable,
  cornerRadius,
  stroke,
  strokeWidth,
}) => {
  const [selected, setSelected] = React.useState(false);
  const [isKeepRatio, setIsKeepRatio] = useState(true);
  const reactRef = React.useRef(null);
  const trRef = React.useRef(null);

  const handleTransformation = (e) => {};

  const handleSelect = (e) => {
    if (!trRef.current) return;

    setSelected((prev) => !prev);
    if (selected) {
      trRef.current.nodes([]);
    } else {
      trRef.current.nodes([reactRef.current]);
    }
  };

  const handleBoundBox = (oldBox, newBox) => {
    if (Math.abs(newBox.width) > MAX_WIDTH) {
      newBox.width = oldBox.width;
    }
    if (Math.abs(newBox.height) > MAX_HEIGHT) {
      newBox.height = oldBox.height;
    }
    return newBox;
  };

  return (
    <>
      <Rect
        ref={reactRef}
        id={id}
        x={x}
        y={y}
        height={height}
        width={width}
        fill={fill}
        draggable={draggable}
        cornerRadius={cornerRadius}
        stroke={stroke}
        strokeWidth={strokeWidth}
        // All the events
        onClick={handleSelect}
        onTransformEnd={handleTransformation}
      />
      <Transformer
        ref={trRef}
        keepRatio={isKeepRatio}
        // boundBoxFunc={handleBoundBox}
        anchorCornerRadius={100}
        rotateLineVisible={false}
        rotationSnaps={[0, 10, -10, 20, -20]}
      />
    </>
  );
};
export default Rectangle;
