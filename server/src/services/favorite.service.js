import { afterEmbedding } from '../helpers/afterTransforming.js';
import handleMongoProjection from '../helpers/handleMongoProjection.js';
import paginateSort from '../helpers/paginateSort.js';
import { Favorite } from '../models/index.js';

const favoriteService = {
  getAll: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(params._fields, '-__v');
      const { _page, _limit, _sort, _fields, _embed, ...others } = params;

      if (_limit || _sort) {
        const response = await paginateSort(params, Favorite);
        return {
          ...response,
          data: afterEmbedding(response.data, _embed),
        };
      }

      const response = await Favorite.find(others).select(_fields).populate(_embed);
      return { data: afterEmbedding(response, _embed) };
    } catch (error) {
      throw new Error(error);
    }
  },
  add: async (userId = '', chapterId = '') => {
    try {
      const model = new Favorite({
        user_id: userId,
        chapter_id: chapterId,
      });

      const response = await model.save();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (userId, chapterId) => {
    try {
      const response = await Favorite.findOneAndDelete({ user_id: userId, chapter_id: chapterId });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default favoriteService;
