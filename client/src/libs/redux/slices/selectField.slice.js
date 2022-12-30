import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedOption: {
    value: "",
    label: "",
  },
};

const selectFieldSlice = createSlice({
  name: "selectField",
  initialState,
  reducers: {
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
  },
});

const { reducer: selectFieldReducer, actions } = selectFieldSlice;

export const { setSelectedOption } = actions;

export default selectFieldReducer;
