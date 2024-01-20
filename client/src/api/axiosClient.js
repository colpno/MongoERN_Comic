import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response?.data?.data?.paginate) {
      return response.data.data;
    }
    if (response?.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    const { response } = error;
    return Promise.reject(response);
  }
);

export default axiosClient;
