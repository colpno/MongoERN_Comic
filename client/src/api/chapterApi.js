import axiosClient from "libs/axios/axiosClient";

const url = "/chapters";

const chapterApi = {
  getAll: (params) => axiosClient.get(url, { params }),

  getOneByID: (chapterID, titleID, isPrivate) => {
    const queryStr = `?${titleID ? `titleId=${titleID}&` : ""}`;
    const options = isPrivate ? { withCredentials: true } : {};

    return axiosClient.get(`${url}/${chapterID}${queryStr}`, options);
  },

  add: (chapter, setProgress) =>
    axiosClient.post(`${url}/create`, chapter, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = (loaded / total) * 100;
        setProgress(percentage);
      },
    }),

  update: (id, data, setProgress) => {
    return axiosClient.put(`${url}/update/${id}`, data, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = (loaded / total) * 100;
        setProgress(percentage);
      },
    });
  },

  updateView: (id) => {
    return axiosClient.put(`${url}/update/${id}/view`);
  },

  delete: (id, data, setProgress) => {
    return axiosClient.delete(`${url}/delete/${id}`, {
      withCredentials: true,
      data: {
        data,
      },
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = Math.floor((loaded / total) * 100);
        setProgress(percentage);
      },
    });
  },

  sort: (titleId, key, order, params) => {
    const titleIdQuery = titleId ? `titleId=${titleId}&` : "";
    return axiosClient.get(`${url}?${titleIdQuery}sort=${key}&order=${order}`, {
      params,
    });
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
