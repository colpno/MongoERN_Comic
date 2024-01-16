import axiosClient from "./axiosClient";

const url = "/chapters";

const chapterApi = {
  getAll: (params, isPrivate = true) => {
    const fullURL = isPrivate ? `${url}/owned` : url;

    return axiosClient.get(fullURL, { params, withCredentials: isPrivate });
  },

  getOne: (id, params, isPrivate = true) => {
    const fullURL = isPrivate ? `${url}/owned/${id}` : `${url}/${id}`;

    return axiosClient.get(fullURL, {
      params,
      withCredentials: isPrivate,
    });
  },

  add: (titleId, title, cover, contents, order, cost, setProgress = () => {}) => {
    return axiosClient.post(
      `${url}/create`,
      { titleId, title, cover, contents, order, cost },
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
    return axiosClient.put(`${url}/update${data.view ? "/view" : ""}/${id}`, data, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = (loaded / total) * 100;
        setProgress(percentage);
      },
    });
  },

  delete: (params, setProgress) => {
    return axiosClient.delete(`${url}/delete`, {
      params,
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = (loaded / total) * 100;
        setProgress(percentage);
      },
    });
  },
};

export default chapterApi;
