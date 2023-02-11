import paginateSort from '../helpers/paginateSort.js';
import { CoinHistory } from '../models/index.js';

const coinHistoryService = {
  getAll: async (params = {}) => {
    params._fields = `-__v${params._fields ? ` ${params._fields}` : ''}`;
    const { _page, _limit, _sort, _order, _fields, _embed, ...others } = params;

    if (_limit || (_sort && _order)) {
      const response = await paginateSort(params, CoinHistory);
      return response;
    }

    const response = await CoinHistory.find(others).select(_fields).populate(_embed);
    return { data: response };
  },
  add: async (userId = '', paymentMethod = '', amount = 0) => {
    const model = new CoinHistory({
      user_id: userId,
      payment_method: paymentMethod,
      amount,
    });

    const response = await model.save();
    return response;
  },
  addMany: async (array = []) => {
    try {
      const response = await CoinHistory.insertMany(array);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (id) => {
    const response = await CoinHistory.findOneAndDelete({ _id: id });
    return response;
  },
};

export default coinHistoryService;
