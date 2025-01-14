import { createSlice } from "@reduxjs/toolkit";

type StateType = {
  currentToolBar: "cursor" | "circle" | "rectangle" | "free hand" | "text" | "eraser" | "arrow" | "point arrow" | "upload";
  currentElement:{
    name:string
  }
};

const initialState:StateType = {
  currentToolBar:"cursor",
  currentElement:{
    name:"something"
  }
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleCurrentToolBar: (state,action) => {
      state.currentToolBar = action.payload;
    },
  },
});

export const { toggleCurrentToolBar } = appSlice.actions;
export default appSlice.reducer;
