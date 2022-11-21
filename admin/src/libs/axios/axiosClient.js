import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.response.use(
  (response) => {
    return response?.data ? response.data : response;
  },
  (error) => {
    const { response } = error;
    const { status } = response;

    if (status === 403) {
      window.location.href = "/login";
      alert(response.data.error);
    }
    return Promise.reject(response);
  }
);

export default axiosClient;
