import { emitToast } from "features/Toast";
import comicApi from "./comicApi";

const BASE_URL = "/users";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (params) => ({
        method: "GET",
        url: BASE_URL,
        params,
      }),
      transformResponse: (response) => {
        return response.data;
      },
      keepUnusedDataFor: 60,
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
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
      invalidatesTags: ["User"],
    }),
    deleteUser: build.mutation({
      query: (filter) => ({
        method: "DELETE",
        url: `${BASE_URL}/delete`,
        data: filter,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useLazyGetUsersQuery,
  useDeleteUserMutation,
} = extendedApi;
