import { emitToast } from "features/Toast.jsx";
import comicApi from "./comicApi.js";

const BASE_URL = "/users";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: (params) => ({
        method: "GET",
        url: `${BASE_URL}/profile`,
        params,
        withCredentials: true,
      }),
      transformResponse: (response) => {
        return response;
      },
      providesTags: ["User"],
    }),
    registerUser: build.mutation({
      query: (data) => ({
        method: "POST",
        url: `${BASE_URL}/register`,
        data,
      }),
    }),
    updateUser: build.mutation({
      query: (data) => ({
        method: "PUT",
        url: `${BASE_URL}/update`,
        data,
        withCredentials: true,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useLazyGetUserQuery,
} = extendedApi;
