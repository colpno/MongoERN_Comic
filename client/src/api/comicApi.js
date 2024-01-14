import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      if (result?.data?.data?.paginate) {
        return result.data.data;
      }
      if (result?.data?.data?.data) {
        return result.data.data;
      }
      if (result?.data) {
        return result.data;
      }
      return result;
    } catch (axiosError) {
      const {
        response: { status },
      } = axiosError;

      if (status === 403) {
        window.location.href = "/not-found";
      }

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
  endpoints: () => ({}),
});

export default comicApi;
