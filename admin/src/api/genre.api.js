import { emitToast } from "features/Toast";
import comicApi from "./comicApi";

const BASE_URL = "/genres";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getGenres: build.query({
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
    addGenre: build.mutation({
      query: (data) => ({
        url: `${BASE_URL}/create`,
        method: "POST",
        data,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message);
        return data;
      },
    }),
    updateGenre: build.mutation({
      query: ({ id, data }) => ({
        url: `${BASE_URL}/update/${id}`,
        method: "PUT",
        data,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message);
        return data;
      },
    }),
    deleteGenre: build.mutation({
      query: (filter) => ({
        url: `${BASE_URL}/delete`,
        method: "DELETE",
        data: filter,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message);
        return data;
      },
    }),
  }),
});

export const {
  useGetGenresQuery,
  useLazyGetGenresQuery,
  useAddGenreMutation,
  useDeleteGenreMutation,
  useUpdateGenreMutation,
} = extendedApi;
