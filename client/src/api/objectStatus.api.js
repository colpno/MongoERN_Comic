import comicApi from "./comicApi.js";

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
    getObjectStatus: build.query({
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
  useGetObjectStatusQuery,
  useGetObjectStatusesQuery,
  useLazyGetObjectStatusQuery,
  useLazyGetObjectStatusesQuery,
} = extendedApi;
