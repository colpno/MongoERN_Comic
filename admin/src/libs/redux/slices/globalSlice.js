import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: "",
  toggleSideBar: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    toggleSideBar: (state, action) => {
      state.toggleSideBar = action.payload;
    },
  },
});

const { reducer: globalReducer, actions } = globalSlice;

export const { setSearchText, toggleSideBar } = actions;

export default globalReducer;
