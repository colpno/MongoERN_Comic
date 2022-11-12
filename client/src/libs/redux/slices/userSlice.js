import { createSlice } from "@reduxjs/toolkit";
import { guessAvatar } from "assets/images";

const initialState = {
  user: {
    id: null,
    guid: "",
    avatar: guessAvatar,
    username: "Đăng nhập",
    role: "",
    point: 0,
    coin: 0,
    income: 0,
  },
  isLoggingIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggingIn = true;
    },
    logout: (state) => {
      state.user = initialState.user;
      state.isLoggingIn = false;
    },
  },
});

const { reducer: userReducer, actions } = userSlice;

export const { login, logout } = actions;

export default userReducer;
