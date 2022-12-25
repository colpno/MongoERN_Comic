import axiosClient from "./axiosClient";

const url = "/chapters";

const chapterApi = {
  getAll: (params, isPrivate = true) => {
    if (isPrivate) {
      return axiosClient.get(`${url}/owned`, {
        params,
        withCredentials: isPrivate,
      });
    }
    return axiosClient.get(url, { params, withCredentials: isPrivate });
  },

  getOne: (id, isPrivate = true) => {
    if (isPrivate) {
      return axiosClient.get(`${url}/owned/${id}`, {
        withCredentials: isPrivate,
      });
    }
    return axiosClient.get(`${url}/${id}`, { withCredentials: isPrivate });
  },

  add: (
    titleId,
    approvedStatusId,
    title,
    cover,
    contents,
    order,
    cost,
    setProgress = () => {}
  ) => {
    return axiosClient.post(
      `${url}/create`,
      { titleId, approvedStatusId, title, cover, contents, order, cost },
      {
        withCredentials: true,
        onUploadProgress: (e) => {
          const { loaded, total } = e;
          const percentage = (loaded / total) * 100;
          setProgress(percentage);
        },
      }
    );
  },

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

  delete: (id, setProgress) => {
    return axiosClient.delete(`${url}/delete/${id}`, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = Math.floor((loaded / total) * 100);
        setProgress(percentage);
      },
    });
  },
};

export default chapterApi;
