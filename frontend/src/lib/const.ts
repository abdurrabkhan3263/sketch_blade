import { ToolBarElem } from "./types";

export const MAX_WIDTH = 500;
export const MAX_HEIGHT = 250;

export const ToolBarArr: ToolBarElem[] = [
  "text",
  "rectangle",
  "circle",
  "arrow",
  "point arrow",
  "free hand",
  "eraser",
  "cursor",
];

const commonProperties = {
  stroke: "#3282B8",
  strokeStyle: "SOLID",
  strokeWidth: "THIN",
  opacity: 1,
  draggable: true,
};

export const toolBarProperties: { [key in ToolBarElem]: any | null } = {
  cursor: null,
  "free hand": {
    ...commonProperties,
  },
  hand: null,
  circle: {
    fill: "#0A1F2C",
    fillStyle: "SOLID",
    ...commonProperties,
  },
  rectangle: {
    fill: "#0A1F2C",
    fillStyle: "SOLID",
    edgeStyle: "ROUNDED",
    ...commonProperties,
  },
  text: {
    stroke: "#3282B8",
    fontSize: "MEDIUM",
    opacity: 1,
  },
  eraser: {
    eraserRadius: 15,
  },
  arrow: commonProperties,
  "point arrow": commonProperties,
  upload: null,
};

export const LOCALSTORAGE_KEY = "canvas_all_shapes";
