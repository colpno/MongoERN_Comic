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
  }),
});

export const { useGetApprovedStatusesQuery, useLazyGetApprovedStatusesQuery } = extendedApi;
