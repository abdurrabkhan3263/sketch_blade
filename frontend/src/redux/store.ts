import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.ts";
import appReducer from "./slices/appSlice.ts";

export const store = configureStore({
  reducer: { auth: authReducer, app: appReducer },
});

export type RootState = ReturnType<typeof store.getState>;
