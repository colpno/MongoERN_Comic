import paginateSort from '../helpers/paginateSort.js';
import { PersonalNotification } from '../models/index.js';

const personalNotificationService = {
  getAll: async (params = {}) => {
    params._fields = `-__v${params._fields ? ` ${params._fields}` : ''}`;
    const { _page, _limit, _sort, _order, _fields, _embed, ...others } = params;

    if (_limit || (_sort && _order)) {
      const response = await paginateSort(params, PersonalNotification);
      return response;
    }

    const response = await PersonalNotification.find(others).select(_fields).populate(_embed);
    return { data: response };
  },
  add: async (userId = '', text = '') => {
    const model = new PersonalNotification({
      user_id: userId,
      text,
    });

    const response = await model.save();
    return response;
  },
  update: async (match, data) => {
    const response = await PersonalNotification.findOneAndUpdate(match, data, {
      new: true,
    });
    return response;
  },
  delete: async (id) => {
    const response = await PersonalNotification.findByIdAndDelete(id);
    return response;
  },
};

export default personalNotificationService;
