import { afterEmbedding } from '../helpers/afterTransforming.js';
import handleMongoProjection from '../helpers/handleMongoProjection.js';
import paginateSort from '../helpers/paginateSort.js';
import { Comment } from '../models/index.js';

class CommentSocket {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    socket.on('join-title', (titleId) => this.join(titleId));
  }

  join(titleId) {
    this.socket.join(titleId);
  }
}

const commentService = {
  getAll: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(params._fields, '-__v');
      const { _page, _limit, _sort, _fields, _embed, ...others } = params;

      if (_limit || _sort) {
        const response = await paginateSort(params, Comment);
        return {
          ...response,
          data: afterEmbedding(response.data, _embed),
        };
      }

      const response = await Comment.find(others).select(_fields).populate(_embed);
      return { data: afterEmbedding(response, _embed) };
    } catch (error) {
      throw new Error(error);
    }
  },
  add: async (
    author = '',
    commentAt = '',
    text = '',
    slug = '',
    parentSlug = '',
    fullSlug = ''
  ) => {
    try {
      const model = new Comment({
        author,
        comment_at: commentAt,
        text,
        slug,
        parent_slug: parentSlug,
        full_slug: fullSlug,
      });

      const createdOne = await model.save();
      const response = await Comment.findById(createdOne._id)
        .populate('author', 'username avatar')
        .populate('deletedBy', 'username');

      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (match, data = {}) => {
    try {
      const response = await Comment.findOneAndUpdate(match, data, { new: true })
        .populate('author', 'username avatar')
        .populate('deletedBy', 'username');
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export { CommentSocket };

export default commentService;
