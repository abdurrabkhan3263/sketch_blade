import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../lib/types";

const initialState: User = {
  _id: "",
  clerkId: "",
  name: "",
  email: "",
};

export const authSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    addUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    getUser: (state) => {
      return state;
    },
  },
});

export const { addUser, getUser } = authSlice.actions;
export default authSlice.reducer;
