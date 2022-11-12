import axiosClient from "libs/axios/axiosClient";

const url = "/payment-methods";

const paymentMethodApi = {
  getAll: (params) => axiosClient.get(url, { params }),

  getOneByID: (id) => axiosClient.get(`${url}/${id}`),

  add: (method) =>
    axiosClient.post(`${url}/create`, method, { withCredentials: true }),

  update: (id, method) =>
    axiosClient.put(`${url}/update/${id}`, method, { withCredentials: true }),

  delete: (id) =>
    axiosClient.delete(`${url}/delete/${id}`, { withCredentials: true }),

  sort: (key, order, params) =>
    axiosClient.get(`${url}?sort=${key}&order=${order}`, {
      params,
    }),

  filter: (filterObj) => {
    const key = Object.keys(filterObj)[0];
    return axiosClient.get(`${url}?${key}_like=${filterObj[key]}`);
  },

  search: (key, value) => {
    return axiosClient.get(`${url}?${key}=${value}`);
  },
};

export default paymentMethodApi;
