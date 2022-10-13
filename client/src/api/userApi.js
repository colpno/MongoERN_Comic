import axiosClient from "libs/axios/axiosClient";

const url = "/users";
const userApi = {
  getOneById: (id) => {
    return axiosClient.get(`${url}/${id}`);
  },

  addUser: () => {
    // return axiosClient.get(url, { id });
  },
};

export default userApi;
