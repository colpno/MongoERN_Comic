import axiosClient from "libs/axios/axiosClient";

const url = "/hired-chapters";

const hiredChapterApi = {
  getAll: (userId, params) =>
    axiosClient.get(`${url}?userId=${userId}`, { params }),

  getOneByID: (id) => axiosClient.get(`${url}/${id}`),

  add: (hiredChapter) =>
    axiosClient.post(`${url}/create`, hiredChapter, { withCredentials: true }),

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

export default hiredChapterApi;
