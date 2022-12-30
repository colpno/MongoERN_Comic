import axiosClient from "./axiosClient";

const url = "/comments";

const commentApi = {
  getAll: (params = {}) => {
    return axiosClient.get(url, { params });
  },

  add: (data = {}, setProgress = () => {}) => {
    return axiosClient.post(`${url}/create`, data, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = (loaded / total) * 100;
        setProgress(percentage);
      },
    });
  },

  update: (id, data, setProgress) => {
    return axiosClient.put(
      `${url}/update${data.view ? "/view" : ""}/${id}`,
      data,
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
};

export default commentApi;
