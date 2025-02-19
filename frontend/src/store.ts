import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice"; // Example reducer

export const store = configureStore({
  reducer: {
    auth: authReducer, // Add reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
