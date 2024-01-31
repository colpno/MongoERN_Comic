import { emitToast } from "features/Toast.jsx";
import comicApi from "./comicApi.js";

const BASE_URL = "/favorites";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getFavorites: build.query({
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
      providesTags: ["Favorite"],
    }),
    addFavorite: build.mutation({
      query: (chapterId) => ({
        url: `${BASE_URL}/create`,
        method: "POST",
        data: { chapterId },
        withCredentials: true,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
      invalidatesTags: ["Favorite", "Chapter"],
    }),
    deleteFavorite: build.mutation({
      query: (chapterId) => ({
        url: `${BASE_URL}/delete`,
        method: "DELETE",
        data: { chapterId },
        withCredentials: true,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
      invalidatesTags: ["Favorite", "Chapter"],
    }),
  }),
});

export const {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  useGetFavoritesQuery,
  useLazyGetFavoritesQuery,
} = extendedApi;
