import { emitToast } from "features/Toast";
import comicApi from "./comicApi";

const BASE_URL = "/notifications";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query({
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
    addNotification: build.mutation({
      query: (data) => ({
        url: `${BASE_URL}/create`,
        method: "POST",
        data,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
    }),
    updateNotification: build.mutation({
      query: ({ id, data }) => ({
        url: `${BASE_URL}/update/${id}`,
        method: "PUT",
        data,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
    }),
    deleteNotification: build.mutation({
      query: (filter) => ({
        url: `${BASE_URL}/delete`,
        method: "DELETE",
        data: filter,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useLazyGetNotificationsQuery,
  useAddNotificationMutation,
  useDeleteNotificationMutation,
  useUpdateNotificationMutation,
} = extendedApi;
