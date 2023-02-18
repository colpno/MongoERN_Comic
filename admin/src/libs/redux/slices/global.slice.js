import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: "",
  toggleHeaderNavBar: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    toggleHeaderNavBar: (state, action) => {
      state.toggleHeaderNavBar = action.payload;
    },
  },
});

const { reducer: globalReducer, actions } = globalSlice;

export const { setSearchText, toggleHeaderNavBar } = actions;

export default globalReducer;
