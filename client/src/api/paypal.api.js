import { emitToast } from "features/Toast.jsx";
import comicApi from "./comicApi.js";

const BASE_URL = "/paypal";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    orderPayPal: build.mutation({
      query: (data = "") => ({
        method: "POST",
        url: `${BASE_URL}/order`,
        data: {
          data,
        },
        withCredentials: true,
      }),
    }),
    capturePayPal: build.mutation({
      query: (orderID) => ({
        method: "POST",
        url: `${BASE_URL}/capture`,
        data: { orderID },
        withCredentials: true,
      }),
    }),
    payoutPayPal: build.mutation({
      query: ({ amount, receiverEmail }) => ({
        method: "POST",
        url: `${BASE_URL}/payout`,
        data: { amount, receiverEmail },
        withCredentials: true,
      }),
      transformResponse: (response) => {
        emitToast(response.message);
        return response;
      },
    }),
  }),
});

export const { useCapturePayPalMutation, useOrderPayPalMutation, usePayoutPayPalMutation } =
  extendedApi;
