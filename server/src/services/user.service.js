import paginateSort from '../helpers/paginateSort.js';
import { User } from '../models/index.js';

const userService = {
  getAll: async (params = {}) => {
    const { _limit, _sort, _order } = params;

    if (_limit || (_sort && _order)) {
      const response = await paginateSort(params, User);
      return response;
    }

    const response = await User.find(params);
    return { data: response };
  },
  getOne: async (params = {}) => {
    try {
      const response = await User.findOne(params);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  register: async (username, password, email, role, dateOfBirth) => {
    try {
      const model = new User({
        username,
        password,
        email,
        role,
        data_of_birth: dateOfBirth,
      });
      const response = await model.save();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (id, data) => {
    try {
      const response = await User.findOneAndUpdate({ _id: id }, data, { new: true });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (id) => {
    try {
      const response = await User.findOneAndDelete({ _id: id });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default userService;