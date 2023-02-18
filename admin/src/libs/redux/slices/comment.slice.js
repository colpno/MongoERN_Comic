import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  comment_at: "",
};

const commentSlice = createSlice({
  initialState,
  name: "comment",
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    setCommentPlace: (state, action) => {
      state.comment_at = action.payload;
    },
  },
});

const { reducer: commentReducer, actions } = commentSlice;

export const { setCommentPlace, setComments } = actions;

export default commentReducer;
