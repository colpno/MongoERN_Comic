import handleMongoProjection from '../helpers/handleMongoProjection.js';
import paginateSort from '../helpers/paginateSort.js';
import { User } from '../models/index.js';

const userService = {
  getAll: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(params._fields, '-__v');
      const { _page, _limit, _sort, _order, _fields, ...others } = params;

      if (_limit || (_sort && _order)) {
        const response = await paginateSort(params, User);
        return response;
      }

      const response = await User.find(others).select(_fields);
      return { data: response };
    } catch (error) {
      throw new Error(error);
    }
  },
  getOne: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(params._fields, '-__v');
      const { _fields, _embed, ...others } = params;

      const response = await User.findOne(others).select(_fields).populate(_embed);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  register: async (username, password, avatar, email, role) => {
    try {
      const model = new User({
        username,
        password,
        avatar,
        email,
        role,
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
  delete: async (match) => {
    try {
      const response = await User.deleteMany(match);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  increaseIncome: async (id, value) => {
    try {
      const response = await User.findOneAndUpdate({ _id: id }, { $inc: { income: value } });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default userService;
