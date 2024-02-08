import { emitToast } from "features/Toast.jsx";
import comicApi from "./comicApi.js";

const BASE_URL = "/chapter-transactions";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getChapterTransactions: build.query({
      query: (params) => ({
        url: `${BASE_URL}/owned`,
        method: "GET",
        params,
        withCredentials: true,
      }),
      transformResponse: (response) => {
        if (response.pagination) return response;
        return response.data;
      },
      providesTags: ["Chapter Transaction"],
    }),
    addChapterTransaction: build.mutation({
      query: ({ titleId, chapterId, method, cost, expiredAt }) => ({
        url: `${BASE_URL}/create`,
        method: "POST",
        data: {
          titleId,
          chapterId,
          method,
          cost,
          expiredAt,
        },
        withCredentials: true,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
      invalidatesTags: ["User", "Chapter Transaction"],
    }),
  }),
});

export const {
  useAddChapterTransactionMutation,
  useGetChapterTransactionsQuery,
  useLazyGetChapterTransactionsQuery,
} = extendedApi;
