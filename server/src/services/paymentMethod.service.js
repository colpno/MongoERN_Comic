import paginateSort from '../helpers/paginateSort.js';
import { PaymentMethod } from '../models/index.js';

const chapterService = {
  getAll: async (params = {}) => {
    const { _page, _limit, _sort, _order } = params;

    if ((_page && _limit) || (_sort && _order)) {
      const response = await paginateSort(params, PaymentMethod);
      return response;
    }

    const response = await PaymentMethod.find(params);
    return { data: response };
  },
  add: async (name = '') => {
    const model = new PaymentMethod({ name });

    const response = await model.save();
    return response;
  },
  update: async (id, data = {}) => {
    const response = await PaymentMethod.findOneAndUpdate({ _id: id }, data, { new: true });
    return response;
  },
  delete: async (id) => {
    const response = await PaymentMethod.findOneAndDelete({ _id: id });
    return response;
  },
};

export default chapterService;
