import { emitToast } from "features/Toast.jsx";
import comicApi from "./comicApi.js";

const BASE_URL = "/follows";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getFollows: build.query({
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
      providesTags: ["Follow"],
    }),
    addFollow: build.mutation({
      query: (titleId) => ({
        url: `${BASE_URL}/create`,
        method: "POST",
        data: { titleId },
        withCredentials: true,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
      invalidatesTags: ["Follow"],
    }),
    deleteFollow: build.mutation({
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
      invalidatesTags: ["Follow"],
    }),
  }),
});

export const {
  useGetFollowsQuery,
  useDeleteFollowMutation,
  useAddFollowMutation,
  useLazyGetFollowsQuery,
} = extendedApi;
