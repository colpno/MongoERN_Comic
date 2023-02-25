import axiosClient from "./axiosClient";

const url = "/users";

const userApi = {
  getAll: (params = {}) => {
    return axiosClient.get(url, { params, withCredentials: true });
  },

  register: (username, password, avatar, email, role, dateOfBirth, setProgress = () => {}) => {
    return axiosClient.post(
      `${url}/register`,
      {
        username,
        password,
        avatar,
        email,
        role,
        dateOfBirth,
      },
      {
        onUploadProgress: (e) => {
          const { loaded, total } = e;
          const progress = (loaded / total) * 100;
          setProgress(progress);
        },
      }
    );
  },

  update: (id, data, setProgress) => {
    return axiosClient.put(`${url}/update/${id}`, data, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const progress = (loaded / total) * 100;
        setProgress(progress);
      },
    });
  },

  delete: (params, setProgress) => {
    return axiosClient.delete(`${url}/delete`, {
      params,
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const progress = (loaded / total) * 100;
        setProgress(progress);
      },
    });
  },
};

export default userApi;