import comicApi from "./comicApi";

const BASE_URL = "/transactions";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getTransactions: build.query({
      query: (params) => ({
        method: "GET",
        url: BASE_URL,
        params,
      }),
      transformResponse: (response) => {
        if (response.pagination) return response;
        return response.data;
      },
      providesTags: ["Transaction"],
    }),
  }),
});

export const { useGetTransactionsQuery, useLazyGetTransactionsQuery } = extendedApi;
