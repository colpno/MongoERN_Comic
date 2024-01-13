import handleMongoProjection from '../helpers/handleMongoProjection.js';
import paginateSort from '../helpers/paginateSort.js';
import { Notification } from '../models/index.js';

const notificationService = {
  getAll: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(params._fields, '-__v');
      const { _page, _limit, _sort, _order, _fields, _embed, ...others } = params;

      if (_limit || (_sort && _order)) {
        const response = await paginateSort(params, Notification);
        return response;
      }

      const response = await Notification.find(others).select(_fields).populate(_embed);
      return { data: response };
    } catch (error) {
      throw new Error(error);
    }
  },
  add: async (cover, title, subTitle, content) => {
    try {
      const model = new Notification({
        cover,
        title,
        subTitle,
        content,
      });

      const response = await model.save();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (match, data) => {
    try {
      const response = await Notification.findOneAndUpdate(match, data, {
        new: true,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (id) => {
    try {
      const response = await Notification.findByIdAndDelete(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default notificationService;
