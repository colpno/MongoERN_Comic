/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = { totalChapters: 0, likes: 0, views: 0 };

const statisticCountSlice = createSlice({
  name: "statisticCount",
  initialState,
  reducers: {
    addStatisticCountData: (state, action) => {
      state.totalChapters = action.payload.totalChapters;
      state.likes = action.payload.likes;
      state.views = action.payload.views;
    },
  },
});

const { reducer: statisticCountReducer, actions } = statisticCountSlice;

export const { addStatisticCountData } = actions;

export default statisticCountReducer;
