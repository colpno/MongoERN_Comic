import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  titles: [],
  myTitles: [],
  top5: [],
  genresOfTitle: [],
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
    setGenresOfTitle: (state, action) => {
      state.genresOfTitle = action.payload;
    },
  },
});

const { reducer: titleReducer, actions } = titleSlice;

export const { setTitles, setMyTitles, setTop5Titles, setGenresOfTitle } =
  actions;

export default titleReducer;
