import { ToolBarElem, ToolBarProperties as Type } from "./types";

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
];

const commonProperties: Type = {
  stroke: "",
  strokeStyle: "SOLID",
  strokeWidth: "THIN",
  opacity: 1,
};

export const toolBarProperties = {
  circle: {
    fill: "#0A1F2C",
    fillStyle: "SOLID",
    opacity: 1,
    ...commonProperties,
  },
  rectangle: {
    fill: "#0A1F2C",
    fillStyle: "SOLID",
    opacity: 1,
    edgeStyle: "ROUNDED",
    ...commonProperties,
  },
  text: {
    stroke: "#3282B8",
    fontSize: "MEDIUM",
    opacity: 1,
  },
  eraser: {
    eraserRadius: 10,
  },
  arrow: commonProperties,
  "point arrow": commonProperties,
  upload: null,
};

// {
//   fill: "#0A1F2C",
//     fillStyle: "SOLID",
//   stroke: "#3282B8",
//   strokeStyle: "SOLID",
//   strokeWidth: "THIN",
//   edgeStyle: "ROUNDED",
//   opacity: 1,
//   eraserRadius: 10,
//   fontSize: "MEDIUM",
// },
