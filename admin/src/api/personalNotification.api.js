import { emitToast } from "features/Toast";
import comicApi from "./comicApi";

const BASE_URL = "/personal-notifications";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getPersonalNotifications: build.query({
      query: (params) => ({
        url: BASE_URL,
        method: "GET",
        params,
      }),
      transformResponse: (response) => {
        if (response.pagination) return response;
        return response.data;
      },
      providesTags: ["Personal Notification"],
    }),
    updatePersonalNotification: build.mutation({
      query: ({ id, data, params = {} }) => ({
        url: `${BASE_URL}/update/${id}`,
        method: "PUT",
        data,
        params,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
      invalidatesTags: ["Personal Notification"],
    }),
    deletePersonalNotification: build.mutation({
      query: (params) => ({
        url: `${BASE_URL}/delete`,
        method: "DELETE",
        params,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
      invalidatesTags: ["Personal Notification"],
    }),
  }),
});

export const {
  useDeletePersonalNotificationMutation,
  useGetPersonalNotificationsQuery,
  useUpdatePersonalNotificationMutation,
  useLazyGetPersonalNotificationsQuery,
} = extendedApi;
