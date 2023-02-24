import axiosClient from "./axiosClient";

const url = "/users";

const userApi = {
  getOne: () => {
    return axiosClient.get(`${url}/profile`, { withCredentials: true });
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

  update: (data, setProgress) => {
    return axiosClient.put(`${url}/update`, data, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const progress = (loaded / total) * 100;
        setProgress(progress);
      },
    });
  },

  delete: (setProgress) => {
    return axiosClient.delete(`${url}/delete`, {
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
