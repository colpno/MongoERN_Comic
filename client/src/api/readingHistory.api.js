import { emitToast } from "features/Toast.jsx";
import comicApi from "./comicApi.js";

const BASE_URL = "/reading-histories";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getReadingHistories: build.query({
      query: (params) => ({
        url: BASE_URL,
        method: "GET",
        params,
        withCredentials: true,
      }),
      transformResponse: (response) => {
        if (response.pagination) return response;
        return response.data;
      },
      providesTags: ["Reading History"],
    }),
    addReadingHistory: build.mutation({
      query: ({ titleId, chapterId }) => ({
        url: `${BASE_URL}/create`,
        data: { titleId, chapterId },
        withCredentials: true,
        method: "POST",
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
      invalidatesTags: ["Reading History"],
    }),
  }),
});

export const {
  useAddReadingHistoryMutation,
  useGetReadingHistoriesQuery,
  useLazyGetReadingHistoriesQuery,
} = extendedApi;
