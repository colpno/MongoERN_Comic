import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { emitToast } from "features/Toast.jsx";

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers, withCredentials = false }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
        withCredentials,
        signal: AbortSignal.timeout(10000),
      });
      return result;
    } catch (axiosError) {
      const {
        response: { status },
      } = axiosError;

      if (status === 403) {
        window.location.href = "/not-found";
      }

      emitToast(axiosError.response?.data || axiosError.message);

      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };

const comicApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  tagTypes: [
    "Follow",
    "Title",
    "Chapter",
    "Comment",
    "User",
    "Chapter Transaction",
    "Favorite",
    "Personal Notification",
    "Reading History",
    "Transaction",
  ],
  endpoints: () => ({}),
  keepUnusedDataFor: 3600,
});

export default comicApi;
