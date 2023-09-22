import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import resumeReducer from "./slices/resumesSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    resume: resumeReducer,
  },
});
