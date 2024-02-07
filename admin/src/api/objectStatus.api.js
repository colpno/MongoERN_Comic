import { emitToast } from "features/Toast.jsx";
import comicApi from "./comicApi";

const BASE_URL = "/object-statuses";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getObjectStatuses: build.query({
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
    addObjectStatus: build.mutation({
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
    updateObjectStatus: build.mutation({
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
    deleteObjectStatus: build.mutation({
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
  useGetObjectStatusesQuery,
  useLazyGetObjectStatusesQuery,
  useAddObjectStatusMutation,
  useDeleteObjectStatusMutation,
  useUpdateObjectStatusMutation,
} = extendedApi;
