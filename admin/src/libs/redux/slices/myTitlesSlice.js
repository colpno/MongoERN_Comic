import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  titles: [],
};

const myTitlesSlice = createSlice({
  name: "myTitles",
  initialState,
  reducers: {
    setMyTitles: (state, action) => {
      state.titles = action.payload;
    },
  },
});

const { reducer: myTitlesReducer, actions } = myTitlesSlice;

export const { setMyTitles } = actions;

export default myTitlesReducer;
