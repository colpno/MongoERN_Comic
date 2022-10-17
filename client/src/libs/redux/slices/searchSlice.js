import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  result: [],
  input: "",
};

const searchResultSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchData: (state, action) => {
      state.data = action.payload;
    },
    setSearchResult: (state, action) => {
      state.result = action.payload;
    },

    setSearchInput: (state, action) => {
      state.input = action.payload;
    },
  },
});

const { reducer: searchReducer, actions } = searchResultSlice;

export const { setSearchData, setSearchResult, setSearchInput } = actions;

export default searchReducer;
