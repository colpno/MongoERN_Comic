import { createSlice } from "@reduxjs/toolkit";
import { robotHead1 } from "assets/images";

const initialState = {
  user: {
    _id: "",
    avatar: robotHead1,
    username: "Đăng nhập",
    role: "",
    point: 0,
    coin: 0,
    income: 0,
    ticket_for_renting: 0,
    ticket_for_buying: 0,
  },
  isLoggingIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
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

export const { setUser, logout } = actions;

export default userReducer;
