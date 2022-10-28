import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  titles: [],
};

const titleSlice = createSlice({
  name: "titles",
  initialState,
  reducers: {
    setTitles: (state, action) => {
      state.titles = action.payload;
    },
  },
});

const { reducer: titleReducer, actions } = titleSlice;

export const { setTitles } = actions;

export default titleReducer;
