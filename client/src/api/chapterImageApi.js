import axiosClient from "libs/axios/axiosClient";

const url = "/chapter-images";

const chapterImageApi = {
  getAll: (params) => axiosClient.get(url, { params }),

  add: (chapterImages) =>
    axiosClient.post(`${url}/create`, chapterImages, { withCredentials: true }),

  delete: (id) =>
    axiosClient.delete(`${url}/delete/${id}`, { withCredentials: true }),

  sort: (chapterId, sort, order, params) => {
    const chapterIdQuery = chapterId
      ? `?chapterId=${chapterId}&sort=${sort}&order=${order}`
      : "";
    return axiosClient.get(`${url}${chapterIdQuery}`, { params });
  },

  filter: (filterObj, params) => {
    const keyArray = Object.keys(filterObj);
    const queryStr = keyArray.reduce((string, key, index) => {
      return index !== keyArray.length - 1
        ? `${string}${key}_like=${filterObj[key]}&`
        : `${string}${key}_like=${filterObj[key]}`;
    }, "");

    return axiosClient.get(`${url}?${queryStr}`, { params });
  },

  search: (searchObj) => {
    const key = Object.keys(searchObj)[0];
    return axiosClient.get(`${url}?${key}=${searchObj[key]}`);
  },
};

export default chapterImageApi;
