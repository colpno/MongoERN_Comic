import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {
    id: "",
    name: "",
    email: "",
    expiredTime: "",
  },
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});

const { reducer: loginReducer, actions } = loginSlice;

export const { setLoginInfo } = actions;

export default loginReducer;
