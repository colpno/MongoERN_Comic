import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentMethods: [],
};

const paymentMethodSlice = createSlice({
  name: "paymentMethods",
  initialState,
  reducers: {
    setPaymentMethods: (state, action) => {
      state.paymentMethods = action.payload;
    },
  },
});

const { reducer: paymentMethodReducer, actions } = paymentMethodSlice;

export const { setPaymentMethods } = actions;

export default paymentMethodReducer;
