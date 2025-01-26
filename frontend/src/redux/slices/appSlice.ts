import { createSlice } from "@reduxjs/toolkit";
import { ToolBarElem, ToolBarProperties } from "../../lib/types";

type StateType = {
  currentToolBar: ToolBarElem;
  toolBarProperties: ToolBarProperties;
};

const initialState: StateType = {
  currentToolBar: "cursor",
  toolBarProperties: {
    fill: "#0A1F2C",
    fillStyle: "SOLID",
    stroke: "#3282B8",
    strokeStyle: "SOLID",
    strokeWidth: "THIN",
    edgeStyle: "ROUNDED",
    opacity: 1,
    eraserRadius: 10,
    fontSize: "MEDIUM",
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeCurrentToolBar: (state, action) => {
      state.currentToolBar = action.payload;
    },
    changeToolBarProperties: (state, action) => {
      state.toolBarProperties = {
        ...state.toolBarProperties,
        ...action.payload,
      };
    },
  },
});

export const { changeCurrentToolBar, changeToolBarProperties } =
  appSlice.actions;
export default appSlice.reducer;
