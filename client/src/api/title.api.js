import { emitToast } from "features/Toast.jsx";
import comicApi from "./comicApi.js";

const BASE_URL = "/titles";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getTitles: build.query({
      query: ({ params = {}, isPrivate = true }) => ({
        url: isPrivate ? `${BASE_URL}/owned` : BASE_URL,
        method: "GET",
        params,
        withCredentials: isPrivate,
      }),
      transformResponse: (response) => {
        if (response.pagination) return response;
        return response.data;
      },
      providesTags: ["Title"],
    }),
    getTitle: build.query({
      query: ({ params, isPrivate = true }) => {
        const id = params._id;
        return {
          url: isPrivate ? `${BASE_URL}/owned/${id}` : `${BASE_URL}/${id}`,
          method: "GET",
          params,
          withCredentials: isPrivate,
        };
      },
      transformResponse: (response) => {
        return response.data;
      },
    }),
    randomTitles: build.query({
      query: (params = {}) => ({
        method: "GET",
        url: `${BASE_URL}/random`,
        params,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),
    addTitle: build.mutation({
      query: (data) => ({
        method: "POST",
        url: `${BASE_URL}/create`,
        data,
        withCredentials: true,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
      invalidatesTags: ["Title"],
    }),
    updateTitle: build.mutation({
      query: ({ id, data }) => ({
        method: "PUT",
        url: `${BASE_URL}/update/${id}`,
        data,
        withCredentials: true,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
      invalidatesTags: ["Title"],
    }),
    deleteTitle: build.mutation({
      query: ({ id, params = {} }) => ({
        method: "DELETE",
        url: `${BASE_URL}/delete/${id}`,
        params,
        withCredentials: true,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
      invalidatesTags: ["Title"],
    }),
  }),
});

export const {
  useAddTitleMutation,
  useDeleteTitleMutation,
  useGetTitleQuery,
  useGetTitlesQuery,
  useLazyGetTitlesQuery,
  useRandomTitlesQuery,
  useUpdateTitleMutation,
  useLazyGetTitleQuery,
  useLazyRandomTitlesQuery,
} = extendedApi;
