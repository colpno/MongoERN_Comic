import axiosClient from "libs/axios/axiosClient";

const url = "/purchased-chapters";

const purchasedChapterApi = {
  getAll: (params) => axiosClient.get(url, { params, withCredentials: true }),

  getAllByUserID: (userId, params) =>
    axiosClient.get(`${url}?userId=${userId}`, {
      params,
    }),

  getOneByID: (id) => axiosClient.get(`${url}/${id}`),

  add: (chapter) =>
    axiosClient.post(`${url}/create`, chapter, { withCredentials: true }),

  delete: (id) =>
    axiosClient.delete(`${url}/delete/${id}`, { withCredentials: true }),

  sort: (key, order, params) =>
    axiosClient.get(`${url}?sort=${key}&order=${order}`, { params }),

  filter: (filterObj) => {
    const key = Object.keys(filterObj)[0];
    return axiosClient.get(`${url}?${key}_like=${filterObj[key]}`);
  },

  search: (key, value) => {
    return axiosClient.get(`${url}?${key}=${value}`);
  },
};

export default purchasedChapterApi;
