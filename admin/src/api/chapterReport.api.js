import comicApi from "./comicApi";

const BASE_URL = "/chapter-reports";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getChapterReports: build.query({
      query: (params = {}) => ({
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

export const { useGetChapterReportsQuery, useLazyGetChapterReportsQuery } = extendedApi;
