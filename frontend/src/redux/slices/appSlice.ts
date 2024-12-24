import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: true,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar;
    },
    getToggleValue: (state) => state.sidebar,
  },
});

export const { toggleSidebar, getToggleValue } = appSlice.actions;
export default appSlice.reducer;
