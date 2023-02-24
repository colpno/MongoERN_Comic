import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: "",
  isHeaderNavBarToggled: false,
  isSideBarToggled: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    toggleHeaderNavBar: (state, action) => {
      state.isHeaderNavBarToggled = action.payload;
    },
    toggleSideBar: (state, action) => {
      state.isSideBarToggled = action.payload;
    },
  },
});

const { reducer: globalReducer, actions } = globalSlice;

export const { setSearchText, toggleHeaderNavBar, toggleSideBar } = actions;

export default globalReducer;
