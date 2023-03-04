import handleMongoProjection from '../helpers/handleMongoProjection.js';
import paginateSort from '../helpers/paginateSort.js';
import { CoinHistory } from '../models/index.js';

const coinHistoryService = {
  getAll: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(params._fields, '-__v');
      const { _page, _limit, _sort, _order, _fields, _embed, ...others } = params;

      if (_limit || (_sort && _order)) {
        const response = await paginateSort(params, CoinHistory);
        return response;
      }

      const response = await CoinHistory.find(others).select(_fields).populate(_embed);
      return { data: response };
    } catch (error) {
      throw new Error(error);
    }
  },
  add: async (userId = '', paymentMethod = '', amount = 0) => {
    try {
      const model = new CoinHistory({
        user_id: userId,
        payment_method: paymentMethod,
        amount,
      });

      const response = await model.save();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  addMany: async (array = []) => {
    try {
      try {
        const response = await CoinHistory.insertMany(array);
        return response;
      } catch (error) {
        throw new Error(error);
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (id) => {
    try {
      const response = await CoinHistory.findOneAndDelete({ _id: id });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default coinHistoryService;
