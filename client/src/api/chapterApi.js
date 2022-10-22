import axiosClient from "libs/axios/axiosClient";

const url = "/chapters";

const chapterApi = {
  getAll: (titleId, params) =>
    axiosClient.get(`${url}?titleId=${titleId}`, {
      params,
    }),

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

  filter: (filterObj) => {
    const key = Object.keys(filterObj)[0];
    return axiosClient.get(`${url}?${key}_like=${filterObj[key]}`);
  },

  search: (searchObj) => {
    const key = Object.keys(searchObj)[0];
    return axiosClient.get(`${url}?${key}=${searchObj[key]}`);
  },
};

export default chapterApi;
