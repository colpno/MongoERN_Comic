const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

const { actions, reducer: commonReducer } = commonSlice;

export const { setLoading } = actions;

export default commonReducer;
