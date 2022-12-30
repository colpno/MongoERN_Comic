import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comment_at: "",
};

const commentSlice = createSlice({
  initialState,
  name: "comment",
  reducers: {
    setCommentPlace: (state, action) => {
      state.comment_at = action.payload;
    },
  },
});

const { reducer: commentReducer, actions } = commentSlice;

export const { setCommentPlace } = actions;

export default commentReducer;
