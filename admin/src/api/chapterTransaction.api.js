import comicApi from "./comicApi";

const BASE_URL = "/chapter-transactions";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getChapterTransactions: build.query({
      query: ({ params }) => ({
        url: BASE_URL,
        method: "GET",
        params,
      }),
      transformResponse: (response) => {
        if (response.pagination) return response;
        return response.data;
      },
      providesTags: ["Chapter Transaction"],
    }),
  }),
});

export const { useGetChapterTransactionsQuery, useLazyGetChapterTransactionsQuery } = extendedApi;
