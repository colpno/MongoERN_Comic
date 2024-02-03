import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { options as toastOptions } from "features/Toast";
import { toast } from "react-toastify";

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers, withCredentials = true }) => {
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

      toast.error(axiosError.response?.data || axiosError.message, toastOptions);

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
