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
    getNotification: build.query({
      query: ({ id, params }) => ({
        url: `${BASE_URL}/${id}`,
        method: "GET",
        params,
      }),
      transformResponse: (response) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetNotificationQuery,
  useLazyGetNotificationQuery,
  useLazyGetNotificationsQuery,
} = extendedApi;
