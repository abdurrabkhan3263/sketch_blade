import {
  EdgeRounded,
  FillStyle, FontFamily, FontSize,
  StrokeStyle,
  StrokeWidth,
} from "../../../../lib/types";

interface IToolBarActions {
  strokeColors: string[];
  backgroundColors: string[];
  fillStyles: FillStyle[];
  strokeWidth: StrokeWidth[];
  strokeStyles: StrokeStyle[];
  edgeRounded: EdgeRounded[];
  fontFamily:FontFamily[]
  fontSize:FontSize[]
}

const ToolBarActions: IToolBarActions = {
  strokeColors: ["#BBE1FA", "#3282B8", "#0F8C79", "#F0F0F0", "#FFD700"],
  backgroundColors: ["#0A1F2C", "#1C3A4B", "#3F4E5B", "#3F5F6B", "#506F7B"],
  fillStyles: ["SOLID","CROSSHATCH","HACHURE"],
  strokeWidth: ["THIN","MEDIUM","THICK"],
  strokeStyles: ["DOTTED","DASHED","SOLID"],
  edgeRounded: ["ROUNDED","SHARP"],
  fontFamily:[""],
  fontSize:["SMALL","MEDIUM","LARGE"]
};

export default ToolBarActions;