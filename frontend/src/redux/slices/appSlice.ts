import { createSlice } from "@reduxjs/toolkit";
import { ToolBarElem, ToolBarProperties } from "../../lib/types";
import { toolBarProperties } from "../../lib/const.ts";

type StateType = {
  currentToolBar: ToolBarElem;
  toolBarProperties: ToolBarProperties | null;
};

const initialState: StateType = {
  currentToolBar: "cursor",
  toolBarProperties: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeCurrentToolBar: (state, action) => {
      const payload: ToolBarElem = action.payload;
      state.currentToolBar = action.payload;

      if (payload === "cursor" || payload === "free hand") {
        state.toolBarProperties = null;
      } else {
        state.toolBarProperties = toolBarProperties[payload];
      }
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
