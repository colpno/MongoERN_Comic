import paginateSort from '../helpers/paginateSort.js';
import { Comment } from '../models/index.js';

const commentService = {
  getAll: async (params = {}) => {
    const { _limit, _sort, _order } = params;

    if (_limit || (_sort && _order)) {
      const response = await paginateSort(params, Comment);
      return response;
    }

    const response = await Comment.find(params);
    return { data: response };
  },
  add: async (userId = '', text = '', parentId = '') => {
    const model = new Comment({
      user_id: userId,
      text,
      parent_id: parentId,
    });

    const response = await model.save();
    return response;
  },
  update: async (id, data = {}) => {
    const response = await Comment.findOneAndUpdate({ _id: id }, data, { new: true });
    return response;
  },
};

export default commentService;
