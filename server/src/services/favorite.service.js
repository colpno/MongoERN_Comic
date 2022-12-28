import paginateSort from '../helpers/paginateSort.js';
import { Favorite } from '../models/index.js';

const favoriteService = {
  getAll: async (params = {}) => {
    const { _page, _limit, _sort, _order } = params;

    if ((_page && _limit) || (_sort && _order)) {
      const response = await paginateSort(params, Favorite);
      return response;
    }

    const response = await Favorite.find(params);
    return { data: response };
  },
  add: async (userId = '', chapterId = '') => {
    const model = new Favorite({
      user_id: userId,
      chapter_id: chapterId,
    });

    const response = await model.save();
    return response;
  },
  delete: async (userId, chapterId) => {
    const response = await Favorite.findOneAndDelete({ userId, chapterId });
    return response;
  },
};

export default favoriteService;
