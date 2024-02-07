import { emitToast } from "features/Toast.jsx";
import comicApi from "./comicApi";

const BASE_URL = "/approved-statuses";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getApprovedStatuses: build.query({
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
    addApprovedStatus: build.mutation({
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
    updateApprovedStatus: build.mutation({
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
    deleteApprovedStatus: build.mutation({
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
  useGetApprovedStatusesQuery,
  useLazyGetApprovedStatusesQuery,
  useAddApprovedStatusMutation,
  useDeleteApprovedStatusMutation,
  useUpdateApprovedStatusMutation,
} = extendedApi;
