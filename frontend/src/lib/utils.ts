import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Arrow,
  FourCoordinates,
  Shape,
  ToolBarElem,
  ToolBarProperties,
  ShapeUpdatedValue,
  SelectedShapesId,
  Rectangle,
  Circle,
} from "./types";
import Konva from "konva";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TYPES RELATED TO CLASS
type Coordinates = {
  x: number;
  y: number;
};

type ShapeCoordinates = {
  x: number;
  y: number;
  width: number;
  height: number;
};

class MethodUtils {
  static shapeDetector(
    mousePosition: Coordinates,
    shapePosition: ShapeCoordinates,
  ): boolean {
    const { x: mouseX, y: mouseY } = mousePosition;
    const { x: shapeX, y: shapeY, height, width } = shapePosition;
    const totalShapeWidth = shapeX + width;
    const totalShapeHeight = shapeY + height;

    const edgeRange = 10; // Reduced from 25 for more precision

    // Left edge - Only detect when mouse is near the actual edge, not inside the shape
    const isNearLeftEdge =
      Math.abs(mouseX - shapeX) <= edgeRange &&
      mouseY >= shapeY &&
      mouseY <= totalShapeHeight;

    // Right edge
    const isNearRightEdge =
      Math.abs(mouseX - totalShapeWidth) <= edgeRange &&
      mouseY >= shapeY &&
      mouseY <= totalShapeHeight;

    // Top edge
    const isNearTopEdge =
      Math.abs(mouseY - shapeY) <= edgeRange &&
      mouseX >= shapeX &&
      mouseX <= totalShapeWidth;

    // Bottom edge
    const isNearBottomEdge =
      Math.abs(mouseY - totalShapeHeight) <= edgeRange &&
      mouseX >= shapeX &&
      mouseX <= totalShapeWidth;

    return (
      isNearLeftEdge || isNearRightEdge || isNearTopEdge || isNearBottomEdge
    );
  }

  static checkIsAddable(points: number[]): boolean {
    if (points?.length < 2 || !points) return false;
    const len = points?.length;

    return (
      points[len - 2] > points[len - 4] + 25 ||
      points[len - 1] > points[len - 3] + 25 ||
      points.length > 5
    );
  }
}

export class AppUtils {
  // static class that have bunch of Utils related to the APP.
  static getFormattedTime(date: string) {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else if (hours < 24) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    }
  }
}

export class CanvasUtils {
  // static class that have bunch of Utils related to the CANVAS.
  static getTransformedPos(stage: Konva.Stage): Coordinates | null {
    const pos = stage.getPointerPosition();

    const transform = stage.getAbsoluteTransform().copy();

    const invertedTransform = transform.invert();
    const transformedPos = pos ? invertedTransform.point(pos) : null;

    return transformedPos;
  }

  static getUpdatedPointsValue(
    updatedValues: ShapeUpdatedValue,
    shapeCurrentValue: Shape,
    type: ToolBarElem,
  ): Shape {
    if (["arrow", "free hand", "point arrow"].includes(type)) {
      const points = [];

      if (type === "free hand") {
        points.push(
          ...((shapeCurrentValue as Arrow)?.points || []),
          ...(updatedValues?.points || []),
        );
      } else if (type === "arrow") {
        const previousPoints = (shapeCurrentValue as Arrow)?.points;
        let updatedPoints;

        if (previousPoints?.length > 1) {
          updatedPoints = [
            previousPoints[0],
            previousPoints[1],
            ...(updatedValues?.points || []),
          ];
        } else {
          updatedPoints = [...(updatedValues?.points || [])];
        }

        points.push(...updatedPoints);
      } else {
        let updatedPoints;

        if ((shapeCurrentValue as Arrow)?.points?.length > 1) {
          const pointsLength = (shapeCurrentValue as Arrow)?.points?.length;
          const previousPoints = (shapeCurrentValue as Arrow)?.points?.slice(
            0,
            pointsLength > 2 ? pointsLength - 2 : pointsLength,
          );

          updatedPoints = [
            ...(previousPoints || []),
            ...(updatedValues?.points || []),
          ];
        } else {
          updatedPoints = [...(updatedValues?.points || [])];
        }

        points.push(...updatedPoints);
      }

      return {
        ...shapeCurrentValue,
        points: (points || []) as number[],
        isAddable: MethodUtils.checkIsAddable(
          (shapeCurrentValue as Arrow)?.points,
        ),
      };
    } else {
      return {
        ...shapeCurrentValue,
        ...updatedValues,
      } as Shape;
    }
  }

  static getCustomCursor(currentToolBar: ToolBarElem, isHovered: boolean) {
    if (!currentToolBar) return;

    if (isHovered && currentToolBar !== "eraser") {
      return "cursor-move";
    }

    if (
      ["rectangle", "circle", "free hand", "arrow", "point arrow"].includes(
        currentToolBar,
      )
    ) {
      return "cursor-crosshair";
    } else if (currentToolBar === "text") {
      return "cursor-text";
    } else if (currentToolBar === "hand") {
      return "cursor-grab";
    } else if (currentToolBar === "eraser") {
      return "cursor-none";
    } else {
      return "cursor-default";
    }
  }

  static getShapeUpdatedValue(
    type: ToolBarElem,
    coordinates: FourCoordinates,
  ): ShapeUpdatedValue | undefined {
    if (type === "cursor" || type === "hand") return;

    const { x, y2, y, x2 } = coordinates;
    const points: number[] = [];

    switch (type) {
      case "rectangle": {
        const width = Math.abs(x2 - x);
        const height = Math.abs(y2 - y);

        if (height <= 3 || width <= 3) {
          return {
            isAddable: false,
          };
        } else {
          return {
            height,
            width,
            isAddable: true,
          };
        }
      }
      case "circle": {
        const radius = Math.hypot(x2 - x, y2 - y);
        const width = Math.abs(x2 - x);
        const height = Math.abs(y2 - y);

        if (radius <= 5) {
          return {
            isAddable: false,
          };
        } else {
          return {
            width,
            height,
            isAddable: true,
          };
        }
      }
      case "free hand":
      case "point arrow":
      case "arrow": {
        points.push(x2, y2);
        return {
          points,
          isAddable: false,
        };
      }
    }
  }

  static getProperties(
    currentSelector: ToolBarElem,
    key: (keyof ToolBarProperties)[],
    toolBarProperties: ToolBarProperties,
  ) {
    if (key.length <= 0 || !Array.isArray(key)) return {};

    let properties = {};

    key.forEach((key) => {
      switch (key) {
        case "edgeStyle": {
          const property = toolBarProperties.edgeStyle;
          const key =
            currentSelector === "point arrow" ? "tension" : "cornerRadius";
          const radiusValue = {
            [key]:
              currentSelector === "point arrow"
                ? property === "SHARP"
                  ? 0
                  : 0.4
                : property === "SHARP"
                  ? 0
                  : 32,
          };

          properties = {
            ...properties,
            ...radiusValue,
          };
          break;
        }
        case "strokeWidth": {
          const property = toolBarProperties.strokeWidth;
          let strokeWidth;

          if (property === "THIN") {
            strokeWidth = 3;
          } else if (property === "MEDIUM") {
            strokeWidth = 4;
          } else if (property === "THICK") {
            strokeWidth = 5;
          }
          properties = { ...properties, strokeWidth };
          break;
        }
        case "strokeStyle": {
          const property = toolBarProperties.strokeStyle;
          let dash;
          if (property === "SOLID") {
            dash = [0];
          } else if (property === "DASHED") {
            dash = [10, 15];
          } else {
            dash = [0, 10];
          }
          properties = { ...properties, dash };
          break;
        }
        default: {
          properties = {
            ...properties,
            [key]: toolBarProperties[key as keyof ToolBarProperties],
          };
        }
      }
    });

    return properties;
  }

  static getInteractedShape(stage: Konva.Stage) {
    const currentPosition = this.getTransformedPos(stage);
    const shapes = stage.find(".shape");

    if (!shapes || !currentPosition) return null;

    const selectedShapes = shapes.filter((shape) => {
      const shapePosition = shape.getClientRect();
      const isPointAddable = MethodUtils.shapeDetector(
        currentPosition,
        shapePosition,
      );

      return isPointAddable;
    });

    return selectedShapes[0] || null;
  }

  static updatedProps(
    props: Shape,
    currentToolBar: ToolBarElem,
    selectedShapesId: SelectedShapesId | null,
  ): Shape {
    props["draggable"] =
      currentToolBar !== "eraser" ? props["draggable"] : false;

    if (
      selectedShapesId &&
      selectedShapesId?.id?.length > 0 &&
      selectedShapesId?.id?.includes(props["id"])
    ) {
      if (selectedShapesId?.purpose === "FOR_DELETING") {
        props["opacity"] = 0.5;
      }

      if (selectedShapesId?.purpose === "FOR_ADDING_ARROW") {
        (props as Rectangle | Circle)["shadowEnabled"] = true;
        (props as Rectangle | Circle)["shadowBlur"] = 50;
      }
    }

    return props;
  }

  static updatedPropToAddArrow(
    shapes: Shape[],
    selectedIds: SelectedShapesId | null,
    arrow: Arrow,
  ) {
    if (!selectedIds) return;

    console.log(selectedIds);
  }
}
