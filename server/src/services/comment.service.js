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
  getOne: async (params = {}) => {
    try {
      const response = await Comment.findOne(params);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  add: async (
    author = {},
    commentAt = '',
    text = '',
    slug = '',
    parentSlug = '',
    fullSlug = ''
  ) => {
    const model = new Comment({
      author,
      comment_at: commentAt,
      text,
      slug,
      parent_slug: parentSlug,
      full_slug: fullSlug,
    });

    const response = await model.save();
    return response;
  },
  update: async (match, data = {}) => {
    const response = await Comment.findOneAndUpdate(match, data, { new: true });
    return response;
  },
};

export default commentService;
