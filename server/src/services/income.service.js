import paginateSort from '../helpers/paginateSort.js';
import { Income } from '../models/index.js';
import { MIN_MONTH, MAX_YEAR } from '../validations/index.js';

const incomeService = {
  getAll: async (params = {}) => {
    const { _page, _limit, _sort, _order, _fields, ...others } = params;

    if (_limit || (_sort && _order)) {
      const response = await paginateSort(params, Income);
      return response;
    }

    const response = await Income.find(others).select(_fields);
    return { data: response };
  },
  getOne: async (userId, month, year) => {
    const response = await Income.findOne({ user_id: userId, month, year });
    return response;
  },
  add: async (
    userId = '',
    purchasedChapterIncome = 0,
    paymentIncome = 0,
    month = MIN_MONTH,
    year = MAX_YEAR
  ) => {
    const model = new Income({
      user_id: userId,
      purchased_chapter_income: purchasedChapterIncome,
      payment_income: paymentIncome,
      month,
      year,
    });

    const response = await model.save();
    return response;
  },
  update: async (userId, month, year, data = 'purchasedChapter' || 'payment', value = 0) => {
    const response = await Income.findOneAndUpdate(
      { user_id: userId, month, year },
      { $inc: { [data]: value } },
      { new: true }
    );

    return response;
  },
};

export default incomeService;
