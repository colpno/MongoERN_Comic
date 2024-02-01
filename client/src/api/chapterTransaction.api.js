import { emitToast } from "features/Toast.jsx";
import comicApi from "./comicApi.js";

const BASE_URL = "/chapter-transactions";

const chapterTransactionApi = {};

export default chapterTransactionApi;

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getChapterTransactions: build.query({
      query: ({ params, isPrivate }) => ({
        url: BASE_URL,
        method: "GET",
        params,
        withCredentials: isPrivate,
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
