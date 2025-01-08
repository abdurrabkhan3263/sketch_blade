import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentToolBar:"cursor",
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
