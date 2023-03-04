import handleMongoProjection from '../helpers/handleMongoProjection.js';
import paginateSort from '../helpers/paginateSort.js';
import { PersonalNotification } from '../models/index.js';

const personalNotificationService = {
  getAll: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(params._fields, '-__v');
      const { _page, _limit, _sort, _order, _fields, _embed, ...others } = params;

      if (_limit || (_sort && _order)) {
        const response = await paginateSort(params, PersonalNotification);
        return response;
      }

      const response = await PersonalNotification.find(others).select(_fields).populate(_embed);
      return { data: response };
    } catch (error) {
      throw new Error(error);
    }
  },
  add: async (userId = '', text = '') => {
    try {
      const model = new PersonalNotification({
        user_id: userId,
        text,
      });

      const response = await model.save();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (match, data) => {
    try {
      const response = await PersonalNotification.findOneAndUpdate(match, data, {
        new: true,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (id) => {
    try {
      const response = await PersonalNotification.findByIdAndDelete(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default personalNotificationService;
