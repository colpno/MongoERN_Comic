import comicApi from "./comicApi.js";

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
    getGenre: build.query({
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

export const { useGetGenreQuery, useGetGenresQuery, useLazyGetGenreQuery, useLazyGetGenresQuery } =
  extendedApi;
