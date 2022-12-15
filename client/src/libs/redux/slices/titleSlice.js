import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  titles: [],
  myTitles: [],
  top5: [],
};

const titleSlice = createSlice({
  name: "titles",
  initialState,
  reducers: {
    setTitles: (state, action) => {
      state.titles = action.payload;
    },
    setMyTitles: (state, action) => {
      state.myTitles = action.payload;
    },
    setTop5Titles: (state, action) => {
      state.top5 = action.payload;
    },
  },
});

const { reducer: titleReducer, actions } = titleSlice;

export const { setTitles, setMyTitles, setTop5Titles } = actions;

export default titleReducer;
