import axiosClient from "libs/axios/axiosClient";

const url = "/chapters";

const chapterApi = {
  getAll: (params) => axiosClient.get(url, { params }),

  getOneByID: (chapterID, titleID) => {
    const queryStr = `?${titleID ? `titleId=${titleID}&` : ""}_expand=title`;
    return axiosClient.get(`${url}/${chapterID}${queryStr}`);
  },

  add: (title) => axiosClient.post(url, title),

  delete: (id) => axiosClient.get(`${url}/${id}`),

  sort: (titleId, key, order, params) => {
    const titleIdQuery = titleId ? `titleId=${titleId}&` : "";
    return axiosClient.get(
      `${url}?${titleIdQuery}_sort=${key}&_order=${order}`,
      {
        params,
      }
    );
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

export default chapterApi;
