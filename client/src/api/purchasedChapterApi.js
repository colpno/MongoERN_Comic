import axiosClient from "libs/axios/axiosClient";

const url = "/purchased-chapters";

const purchasedChapterApi = {
  getAll: (params) =>
    axiosClient.get(`${url}?_expand=chapter&_expand=user`, { params }),

  getAllByUserID: (userId, params) =>
    axiosClient.get(`${url}?userId=${userId}&_expand=chapter&_expand=user`, {
      params,
    }),

  getOneByID: (id) => axiosClient.get(`${url}/${id}`),

  add: (chapter) => axiosClient.post(url, chapter),

  delete: (id) => axiosClient.get(`${url}/${id}`),

  sort: (key, order, params) =>
    axiosClient.get(`${url}?_sort=${key}&_order=${order}`, { params }),

  filter: (filterObj) => {
    const key = Object.keys(filterObj)[0];
    return axiosClient.get(`${url}?${key}_like=${filterObj[key]}`);
  },

  search: (key, value) => {
    return axiosClient.get(`${url}?${key}=${value}`);
  },
};

export default purchasedChapterApi;
