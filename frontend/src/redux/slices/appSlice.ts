import { createSlice } from "@reduxjs/toolkit";
import { ToolBarElem, ToolBarProperties } from "../../lib/types";

type StateType = {
  currentToolBar: ToolBarElem;
  toolBarProperties: ToolBarProperties;
};

const initialState: StateType = {
  currentToolBar: "cursor",
  toolBarProperties: {
    fillColor: "#0A1F2C",
    fillStyle: "SOLID",
    strokeColor: "#3282B8",
    strokeStyle: "SOLID",
    strokeWidth: "THIN",
    edgeStyle: "ROUNDED",
    opacity: 100,
    eraserRadius: 10,
    fontSize: "MEDIUM",
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addToolBarElement: (state, action) => {
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

export const { addToolBarElement, changeToolBarProperties } = appSlice.actions;
export default appSlice.reducer;
