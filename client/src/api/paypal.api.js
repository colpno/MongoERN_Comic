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
  }),
});

export const { useCapturePayPalMutation, useOrderPayPalMutation } = extendedApi;
