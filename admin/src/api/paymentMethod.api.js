import comicApi from "./comicApi";

const BASE_URL = "/payment-methods";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getPaymentMethods: build.query({
      query: (params) => ({
        url: BASE_URL,
        method: "GET",
        params,
      }),
      transformResponse: (response) => {
        if (response.pagination) return response;
        return response.data;
      },
    }),
  }),
});

export const { useGetPaymentMethodsQuery, useLazyGetPaymentMethodsQuery } = extendedApi;
