import comicApi from "./comicApi";

const url = "/notifications";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getAllNotifications: build.query({
      query: (params) => ({
        url,
        params,
      }),
    }),
    getNotification: build.query({
      query: (id, params) => ({
        url: `${url}/${id}`,
        params,
      }),
    }),
  }),
});

export const { useGetAllNotificationsQuery, useGetNotificationQuery } = extendedApi;
