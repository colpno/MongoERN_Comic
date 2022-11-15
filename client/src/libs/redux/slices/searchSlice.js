import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
};

const searchResultSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.text = action.payload;
    },
  },
});

const { reducer: searchReducer, actions } = searchResultSlice;

export const { setSearchText } = actions;

export default searchReducer;
