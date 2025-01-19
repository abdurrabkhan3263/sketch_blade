import React from "react";
import { Layer, Stage, Star, Text } from "react-konva";
import Rectangle from "../components/file/CanvaElements/Rectangle.tsx";

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false,
  }));
}

const INITIAL_STATE = generateShapes();

function Canvas() {
  const [stars, setStars] = React.useState(INITIAL_STATE);

  const handleDragStart = (e) => {
    const id = e.target.id();
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        };
      }),
    );
  };
  const handleDragEnd = (e) => {
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: false,
        };
      }),
    );
  };
  return (
    <div className="fixed right-1/2 top-0 z-20 size-full translate-x-1/2">
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Rectangle
            id="rect"
            x={20}
            y={20}
            height={200}
            width={500}
            fill={"#00D2FF"}
            stroke={"white"}
            strokeWidth={2.5}
            draggable={true}
            cornerRadius={28}
          />
          <Text text="Try to Hello" fill="#89b717" draggable fillEnabled />
          {stars.map((star) => (
            <Star
              key={star.id}
              id={star.id}
              x={star.x}
              y={star.y}
              numPoints={5}
              innerRadius={20}
              outerRadius={40}
              fill="#89b717"
              opacity={0.8}
              draggable
              rotation={star.rotation}
              scaleX={star.isDragging ? 1.2 : 1}
              scaleY={star.isDragging ? 1.2 : 1}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default Canvas;
