import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    add: (state, action) => {},
  },
});

export const { add } = slice.actions;
export default slice.reducer;
