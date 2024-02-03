import comicApi from "./comicApi";

const BASE_URL = "/genres";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getGenres: build.query({
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

export const { useGetGenresQuery, useLazyGetGenresQuery } = extendedApi;
