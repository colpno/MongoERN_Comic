import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  theme: "light",
  isSidebarLocked: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    toggleChangeTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    toggleChangeSidebarLock: (state) => {
      state.isSidebarLocked = !state.isSidebarLocked;
    },
  },
});

const { actions, reducer: commonReducer } = commonSlice;

export const { setLoading, toggleChangeTheme, toggleChangeSidebarLock } = actions;

export default commonReducer;
