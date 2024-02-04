import { emitToast } from "features/Toast.jsx";
import comicApi from "./comicApi.js";

const BASE_URL = "/transactions";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getTransactions: build.query({
      query: (params) => ({
        method: "GET",
        url: `${BASE_URL}/owned`,
        params,
        withCredentials: true,
      }),
      transformResponse: (response) => {
        if (response.pagination) return response;
        return response.data;
      },
      providesTags: ["Transaction"],
    }),
    addTransaction: build.mutation({
      query: (data) => ({
        method: "POST",
        url: `${BASE_URL}/create`,
        data,
        withCredentials: true,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
      invalidatesTags: ["Transaction", "User"],
    }),
  }),
});

export const { useAddTransactionMutation, useGetTransactionsQuery, useLazyGetTransactionsQuery } =
  extendedApi;
