import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    _id: "",
    avatar: "/static/media/adipisciearumaut-robot-head.54b71caf3629e47998f7.png",
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
      state.user = { ...state.user, ...action.payload };
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
