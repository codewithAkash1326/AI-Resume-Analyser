import { createSlice } from "@reduxjs/toolkit";

const resumeSlice = createSlice({
  name: "resume",

  initialState: {
    resumes: [],
  },

  reducers: {
    setResumes: (state, action) => {
      state.resumes = action.payload;
    },
  },
});

export const { setResumes } = resumeSlice.actions;

export default resumeSlice.reducer;
