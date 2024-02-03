import comicApi from "./comicApi";

const BASE_URL = "/income-reports";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getIncomeReports: build.query({
      query: (params) => ({
        method: "GET",
        url: BASE_URL,
        params,
      }),
      transformResponse: (response) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetIncomeReportsQuery, useLazyGetIncomeReportsQuery } = extendedApi;
