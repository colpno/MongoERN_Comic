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
  }),
});

export const { useGetObjectStatusesQuery, useLazyGetObjectStatusesQuery } = extendedApi;
