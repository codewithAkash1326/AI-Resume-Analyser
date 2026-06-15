import { createSlice } from "@reduxjs/toolkit";

const analysisSlice = createSlice({
  name: "analysis",

  initialState: {
    history: [],
  },

  reducers: {
    setHistory: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const { setHistory } = analysisSlice.actions;

export default analysisSlice.reducer;
