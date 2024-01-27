const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  toast: {
    message: "",
    mode: "success",
  },
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setToast: (state, action) => {
      state.toast = action.payload;
    },
  },
});

const { actions, reducer: commonReducer } = commonSlice;

export const { setLoading, setToast } = actions;

export default commonReducer;
