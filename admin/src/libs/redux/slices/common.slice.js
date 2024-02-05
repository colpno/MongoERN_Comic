const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  theme: "light",
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
  },
});

const { actions, reducer: commonReducer } = commonSlice;

export const { setLoading, toggleChangeTheme } = actions;

export default commonReducer;
