import paginateSort from '../helpers/paginateSort.js';
import { Favorite } from '../models/index.js';

const favoriteService = {
  getAll: async (params = {}) => {
    const { _page, _limit, _sort, _order, _fields, _embed, ...others } = params;

    if (_limit || (_sort && _order)) {
      const response = await paginateSort(params, Favorite);
      return response;
    }

    const response = await Favorite.find(others).select(_fields).populate(_embed);
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
    const response = await Favorite.findOneAndDelete({ user_id: userId, chapter_id: chapterId });
    return response;
  },
};

export default favoriteService;
