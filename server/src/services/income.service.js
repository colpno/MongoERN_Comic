import handleMongoProjection from '../helpers/handleMongoProjection.js';
import paginateSort from '../helpers/paginateSort.js';
import { Income } from '../models/index.js';
import { MIN_MONTH, MAX_YEAR } from '../validations/index.js';

const incomeService = {
  getAll: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(params._fields, '-__v');
      const { _page, _limit, _sort, _order, _fields, _embed, ...others } = params;

      if (_limit || (_sort && _order)) {
        const response = await paginateSort(params, Income);
        return response;
      }

      const response = await Income.find(others).select(_fields).populate(_embed);
      return { data: response };
    } catch (error) {
      throw new Error(error);
    }
  },
  getOne: async (userId, month, year) => {
    try {
      const response = await Income.findOne({ user_id: userId, month, year });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  add: async (
    userId = '',
    purchasedChapterIncome = 0,
    paymentIncome = 0,
    month = MIN_MONTH,
    year = MAX_YEAR
  ) => {
    try {
      const model = new Income({
        user_id: userId,
        purchased_chapter_income: purchasedChapterIncome,
        payment_income: paymentIncome,
        month,
        year,
      });

      const response = await model.save();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (userId, month, year, data = 'purchasedChapter' || 'payment', value = 0) => {
    try {
      const response = await Income.findOneAndUpdate(
        { user_id: userId, month, year },
        { $inc: { [data]: value } },
        { new: true }
      );

      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default incomeService;
