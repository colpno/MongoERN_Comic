import handleMongoProjection from '../helpers/handleMongoProjection.js';
import paginateSort from '../helpers/paginateSort.js';
import { Transaction } from '../models/index.js';

const transactionService = {
  getAll: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(params._fields, '-__v');
      const { _page, _limit, _sort, _order, _fields, _embed, ...others } = params;

      if (_limit || (_sort && _order)) {
        const response = await paginateSort(params, Transaction);
        return response;
      }

      const response = await Transaction.find(others).select(_fields).populate(_embed);
      return { data: response };
    } catch (error) {
      throw new Error(error);
    }
  },
  add: async (userId = '', method = '', unit = '', amount = 0) => {
    try {
      const model = new Transaction({
        user_id: userId,
        method,
        unit,
        amount,
      });

      const response = await model.save();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  checkFields: (data = {}) => {
    if (!data.amount) {
      throw new Error('Thiếu số lượng');
    }

    if (!data.method) {
      throw new Error('Thiếu phương thức');
    }

    if (!data.unit) {
      throw new Error('Thiếu đơn vị giao dịch');
    }
  },
};

export default transactionService;
