import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: undefined,
  titles: [],
  myTitles: [],
  top5: [],
  genresOfTitle: [],
};

const titleSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setTitles: (state, action) => {
      state.titles = action.payload;
    },
    setMyTitles: (state, action) => {
      state.myTitles = action.payload;
    },
    setTop5Titles: (state, action) => {
      state.top5 = action.payload;
    },
    setGenresOfTitle: (state, action) => {
      state.genresOfTitle = action.payload;
    },
  },
});

const { reducer: titleReducer, actions } = titleSlice;

export const { setTitle, setTitles, setMyTitles, setTop5Titles, setGenresOfTitle } = actions;

export default titleReducer;
