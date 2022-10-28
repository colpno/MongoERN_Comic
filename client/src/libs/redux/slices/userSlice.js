import { createSlice } from "@reduxjs/toolkit";
import { guessAvatar } from "assets/images";

const initialState = {
  user: {
    id: null,
    avatar: guessAvatar,
    userName: "Đăng nhập",
    role: "",
    point: 0,
    coin: 0,
    income: 0,
  },
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = initialState.user;
      state.isLoggedIn = initialState.isLoggedIn;
    },
  },
});

const { reducer: userReducer, actions } = userSlice;

export const { login, logout } = actions;

export default userReducer;
