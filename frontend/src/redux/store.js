import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import useReducer from "./userSlice.js";

export default configureStore({
  reducer: {
    auth: authReducer,
    users: useReducer,
  },
});
