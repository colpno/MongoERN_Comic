import comicApi from "./comicApi";

const BASE_URL = "/chapters";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getChapters: build.query({
      query: ({ params }) => ({
        url: BASE_URL,
        method: "GET",
        params,
      }),
      transformResponse: (response) => {
        if (response.pagination) return response;
        return response.data;
      },
      providesTags: ["Chapter"],
    }),
  }),
});

export const { useGetChaptersQuery, useLazyGetChaptersQuery } = extendedApi;
