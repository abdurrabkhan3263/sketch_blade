import {
    EdgeRounded,
  FillStyle,
  StrokeStyle,
  StrokeWidth,
} from "../../../../lib/types";

interface IToolBarActions {
  strokeColor: string[];
  backgroundColors: string[];
  fillStyle: FillStyle[];
  strokeWidth: StrokeWidth[];
  strokeStyle: StrokeStyle[];
  edgeRounded: EdgeRounded[];
}

const ToolBarActions: IToolBarActions = {
  strokeColor: ["#BBE1FA", "#3282B8", "#0F4C75", "#F0F0F0", "#FFD700"],
  backgroundColors: ["#0A1F2C", "#1C3A4B", "#2E4E5B", "#3F5F6B", "#506F7B"],
  fillStyle: ["SOLID","CROSSHATCH"],
  strokeWidth: ["THIN","MEDIUM","THICK"],
  strokeStyle: ["DOTTED","DASHED","SOLID"],
  edgeRounded: ["ROUNDED","SHARP"],
};

export default ToolBarActions;