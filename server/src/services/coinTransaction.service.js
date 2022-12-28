import paginateSort from '../helpers/paginateSort.js';
import { CoinTransaction } from '../models/index.js';

const coinTransactionService = {
  getAll: async (params = {}) => {
    const { _page, _limit, _sort, _order } = params;

    if ((_page && _limit) || (_sort && _order)) {
      const response = await paginateSort(params, CoinTransaction);
      return response;
    }

    const response = await CoinTransaction.find(params);
    return { data: response };
  },
  add: async (userId = '', paymentMethodId = '', amount = 0) => {
    const model = new CoinTransaction({
      user_id: userId,
      payment_method_id: paymentMethodId,
      amount,
    });

    const response = await model.save();
    return response;
  },
  delete: async (id) => {
    const response = await CoinTransaction.findOneAndDelete({ _id: id });
    return response;
  },
};

export default coinTransactionService;
