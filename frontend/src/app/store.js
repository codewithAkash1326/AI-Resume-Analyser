import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../redux/authSlice";
import resumeReducer from "../redux/resumeSlice";
import analysisReducer from "../redux/analysisSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    resume: resumeReducer,
    analysis: analysisReducer,
  },
});
