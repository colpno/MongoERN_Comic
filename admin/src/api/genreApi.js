import axiosClient from "libs/axios/axiosClient";

const url = "/genres";

const genreApi = {
  getAll: (params) => axiosClient.get(url, { params }),

  getOneByID: (id) => axiosClient.get(`${url}/${id}`),

  add: (genre, setProgress) =>
    axiosClient.post(`${url}/create`, genre, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = (loaded / total) * 100;
        setProgress(percentage);
      },
    }),

  update: (id, genre, setProgress) =>
    axiosClient.put(`${url}/update/${id}`, genre, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = (loaded / total) * 100;
        setProgress(percentage);
      },
    }),

  delete: (id, setProgress) =>
    axiosClient.delete(`${url}/delete/${id}`, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = (loaded / total) * 100;
        setProgress(percentage);
      },
    }),

  sort: (key, order, params) =>
    axiosClient.get(`${url}?sort=${key}&order=${order}`, { params }),

  filter: (property, params) => {
    const keyArray = Object.keys(property);
    const queryStr = keyArray.reduce((string, key, index) => {
      return index !== keyArray.length - 1
        ? `${string}${key}_like=${property[key]}&`
        : `${string}${key}_like=${property[key]}`;
    }, "");

    return axiosClient.get(`${url}?${queryStr}`, { params });
  },

  search: (searchObj) => {
    const keys = Object.keys(searchObj);
    const queryStr = keys.map((key, index) =>
      index === 0 ? `${key}=${searchObj[key]}` : `&${key}=${searchObj[key]}`
    );
    return axiosClient.get(`${url}?${queryStr}`);
  },
};

export default genreApi;