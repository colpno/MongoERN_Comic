import { emitToast } from "features/Toast";
import comicApi from "./comicApi";

const BASE_URL = "/titles";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getTitles: build.query({
      query: ({ params = {} }) => ({
        url: BASE_URL,
        method: "GET",
        params,
      }),
      transformResponse: (response) => {
        if (response.pagination) return response;
        return response.data;
      },
      providesTags: ["Title"],
    }),
    updateTitle: build.mutation({
      query: ({ id, data }) => ({
        method: "PUT",
        url: `${BASE_URL}/update/${id}`,
        data,
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

export const { useGetTitlesQuery, useLazyGetTitlesQuery, useUpdateTitleMutation } = extendedApi;
