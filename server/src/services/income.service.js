import dotenv from 'dotenv';
import handleMongoProjection from '../helpers/handleMongoProjection.js';
import paginateSort from '../helpers/paginateSort.js';
import { Income } from '../models/index.js';
import { MAX_YEAR, MIN_MONTH } from '../validations/index.js';
import { afterEmbedding } from '../helpers/afterTransforming.js';

dotenv.config();

const incomeService = {
  getAll: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(params._fields, '-__v');
      const { _page, _limit, _sort, _fields, _embed, ...others } = params;

      if (_limit || _sort) {
        const response = await paginateSort(params, Income);
        return {
          ...response,
          data: afterEmbedding(response.data, _embed),
        };
      }

      const response = await Income.find(others).select(_fields).populate(_embed);
      return { data: afterEmbedding(response, _embed) };
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
  add: async (userId = '', month = MIN_MONTH, year = MAX_YEAR, purchasedChapterIncome = 0) => {
    try {
      const model = new Income({
        user_id: userId,
        purchased_chapter_income: purchasedChapterIncome,
        month,
        year,
      });

      const response = await model.save();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (userId, month, year, data = 'purchased_chapter_income', value = 0) => {
    try {
      const response = await Income.findOneAndUpdate(
        { user_id: userId, month, year },
        { $inc: { [data]: value, total_income: value } },
        { new: true }
      );

      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  make: (dollar) => {
    const { SELLER_COMMISSION_RATE } = process.env;
    const PLATFORM_COMMISSION_RATE = 1 - SELLER_COMMISSION_RATE;

    const sellerReceive = (dollar * Number.parseFloat(SELLER_COMMISSION_RATE)).toFixed(2);
    const platformReceive = (dollar * Number.parseFloat(PLATFORM_COMMISSION_RATE)).toFixed(2);

    return {
      sellerReceive,
      platformReceive,
    };
  },
};

export default incomeService;
