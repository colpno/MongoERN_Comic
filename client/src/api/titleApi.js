import axiosClient from "libs/axios/axiosClient";

const url = "/titles";
const getMoreInfo = "_embed=chapters&_expand=genre&_expand=titleStatus";

const titleApi = {
  getAll: (params) => axiosClient.get(`${url}?${getMoreInfo}`, { params }),

  getAllByProperty: (property, value, params) =>
    axiosClient.get(`${url}?${property}_like=${value}&${getMoreInfo}`, {
      params,
    }),

  getOneByID: (id) => axiosClient.get(`${url}/${id}?${getMoreInfo}`),

  add: (title) => axiosClient.post(url, title),

  delete: (id) => axiosClient.get(`${url}/${id}`),

  sort: (key, order, params) =>
    axiosClient.get(`${url}?_sort=${key}&_order=${order}&${getMoreInfo}`, {
      params,
    }),

  sortByUserID: (ID, key, order, params) =>
    axiosClient.get(
      `${url}?userID=${ID}&_sort=${key}&_order=${order}&${getMoreInfo}`,
      {
        params,
      }
    ),

  filter: (filterObj) => {
    const key = Object.keys(filterObj)[0];
    return axiosClient.get(
      `${url}?${key}_like=${filterObj[key]}&${getMoreInfo}`
    );
  },

  search: (key, value) => {
    return axiosClient.get(`${url}?${key}=${value}&${getMoreInfo}`);
  },
};

export default titleApi;
