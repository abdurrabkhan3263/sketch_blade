import { createSlice } from "@reduxjs/toolkit";

type StateType = {
  currentToolBar:
    | "cursor"
    | "circle"
    | "rectangle"
    | "free hand"
    | "text"
    | "eraser"
    | "arrow"
    | "point arrow"
    | "upload";
  currentShape: {
    properties?: any;
    ref?: any;
  };
};

const initialState: StateType = {
  currentToolBar: "cursor",
  currentShape: {
    properties: {},
    ref: null,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleCurrentToolBar: (state, action) => {
      state.currentToolBar = action.payload;
    },
    changeCurrentShape: (state, action) => {
      state.currentShape = action.payload;
    },
    removeCurrentShape: (state) => {
      state.currentShape = { properties: null, ref: null };
    },
  },
});

export const { toggleCurrentToolBar, changeCurrentShape, removeCurrentShape } =
  appSlice.actions;
export default appSlice.reducer;
