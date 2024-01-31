import comicApi from "./comicApi.js";

const BASE_URL = "/title-reports";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getTitleReports: build.query({
      query: (params = {}) => ({
        method: "GET",
        url: BASE_URL,
        params,
        withCredentials: true,
      }),
      transformResponse: (response) => {
        if (response.pagination) return response;
        return response.data;
      },
    }),
  }),
});

export const { useGetTitleReportsQuery, useLazyGetTitleReportsQuery } = extendedApi;
