import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chapters: [],
  chapter: { info: {}, images: [] },
};

const chapterSlice = createSlice({
  name: "chapter",
  initialState,
  reducers: {
    setChapters: (state, action) => {
      state.chapters = action.payload;
    },
    setChapter: (state, action) => {
      state.chapter = action.payload;
    },
  },
});

const { reducer: chapterReducer, actions } = chapterSlice;

export const { setChapter, setChapters } = actions;

export default chapterReducer;
