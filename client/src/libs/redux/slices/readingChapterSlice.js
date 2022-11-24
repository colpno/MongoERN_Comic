import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chapters: [],
  chapter: { info: {}, images: [] },
  userLike: {},
};

const readingChapterSlice = createSlice({
  name: "readingChapter",
  initialState,
  reducers: {
    setChapters: (state, action) => {
      state.chapters = action.payload;
    },
    setChapterInfo: (state, action) => {
      state.chapter.info = action.payload;
    },
    setChapterImages: (state, action) => {
      state.chapter.images = action.payload;
    },
    setUserLike: (state, action) => {
      state.userLike = action.payload;
    },
  },
});

const { reducer: readingChapterReducer, actions } = readingChapterSlice;

export const { setChapterInfo, setChapterImages, setChapters, setUserLike } =
  actions;

export default readingChapterReducer;
