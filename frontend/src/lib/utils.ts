import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FourCoordinates, ToolBarElem, ToolBarProperties } from "./types";

type ShapeUpdatedValue = {
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
  key: string,
  toolBarProperties: ToolBarProperties,
) {
  switch (key) {
    case "edgeStyle": {
      const property = toolBarProperties.edgeStyle;
      if (property === "SHARP") {
        return 0;
      } else if (property === "ROUNDED") {
        return 32;
      }
      break;
    }
    case "strokeWidth": {
      const property = toolBarProperties.strokeWidth;
      if (property === "THIN") {
        return 3;
      } else if (property === "MEDIUM") {
        return 4;
      } else if (property === "THICK") {
        return 5;
      }
      break;
    }
    case "strokeStyle": {
      const property = toolBarProperties.strokeStyle;
      if (property === "SOLID") {
        return [0];
      } else if (property === "DASHED") {
        return [8, 10];
      } else {
        return [0, 10];
      }
    }
    default: {
      return toolBarProperties[key as keyof ToolBarProperties];
    }
  }
}

export function getShapeUpdatedValue(
  type: ToolBarElem,
  coordinates: FourCoordinates,
): ShapeUpdatedValue | undefined {
  if (type === "cursor") return;
  const { x, y2, y, x2 } = coordinates;

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
  }
}
