import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FourCoordinates, ToolBarElem, ToolBarProperties } from "./types";

type ShapeUpdatedValue = {
  points?: number[];
  height?: number;
  width?: number;
  isAddable: boolean;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(date: string) {
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

export function getProperties(
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

export function getShapeUpdatedValue(
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

export function getCustomCursor(
  currentToolBar: ToolBarElem,
  isHovered: boolean,
) {
  if (!currentToolBar) return;

  if (isHovered && currentToolBar !== "eraser") {
    return "cursor-move";
  }

  if (["rectangle", "circle", "free hand"].includes(currentToolBar)) {
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
