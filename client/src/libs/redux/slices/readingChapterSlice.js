import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chapters: [],
  chapter: {},
  favorite: {},
};

const readingChapterSlice = createSlice({
  name: "readingChapter",
  initialState,
  reducers: {
    setChapters: (state, action) => {
      state.chapters = action.payload;
    },
    setChapter: (state, action) => {
      state.chapter = action.payload;
    },
    setFavorite: (state, action) => {
      state.favorite = action.payload;
    },
  },
});

const { reducer: readingChapterReducer, actions } = readingChapterSlice;

export const { setChapter, setChapterImages, setChapters, setFavorite } =
  actions;

export default readingChapterReducer;
