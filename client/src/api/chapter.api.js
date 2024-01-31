import { emitToast } from "features/Toast.jsx";
import comicApi from "./comicApi.js";

const BASE_URL = "/chapters";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getChapters: build.query({
      query: ({ params, isPrivate = true }) => ({
        url: isPrivate ? `${BASE_URL}/owned` : BASE_URL,
        method: "GET",
        params,
        withCredentials: isPrivate,
      }),
      transformResponse: (response) => {
        if (response.pagination) return response;
        return response.data;
      },
      providesTags: ["Chapter"],
    }),
    getChapter: build.query({
      query: ({ id, params, isPrivate = true }) => ({
        url: isPrivate ? `${BASE_URL}/owned/${id}` : `${BASE_URL}/${id}`,
        method: "GET",
        params,
        withCredentials: isPrivate,
      }),
      transformResponse: (response) => {
        return response.data;
      },
    }),
    addChapter: build.mutation({
      query: (data) => ({
        url: `${BASE_URL}/create`,
        method: "POST",
        data,
        withCredentials: true,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
      invalidatesTags: ["Chapter", "Title"],
    }),
    updateChapter: build.mutation({
      query: ({ id, data }) => ({
        url: `${BASE_URL}/update${data.view ? "/view" : ""}/${id}`,
        method: "PUT",
        data,
        withCredentials: true,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
      invalidatesTags: ["Chapter", "Title"],
    }),
    deleteChapter: build.mutation({
      query: (params) => ({
        url: `${BASE_URL}/delete`,
        method: "DELETE",
        params,
        withCredentials: true,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
      invalidatesTags: ["Chapter", "Title"],
    }),
  }),
});

export const {
  useAddChapterMutation,
  useDeleteChapterMutation,
  useGetChapterQuery,
  useGetChaptersQuery,
  useLazyGetChapterQuery,
  useLazyGetChaptersQuery,
  useUpdateChapterMutation,
} = extendedApi;
