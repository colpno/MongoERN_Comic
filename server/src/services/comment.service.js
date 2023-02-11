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
    params._fields = `-__v${params._fields ? ` ${params._fields}` : ''}`;
    const { _page, _limit, _sort, _order, _fields, _embed, ...others } = params;

    if (_limit || (_sort && _order)) {
      const response = await paginateSort(params, Comment);
      return response;
    }

    const response = await Comment.find(others).select(_fields).populate(_embed);
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
    author = '',
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

    const createdOne = await model.save();
    const response = await Comment.findById(createdOne._id)
      .populate('author', 'username avatar')
      .populate('deletedBy', 'username');

    return response;
  },
  update: async (match, data = {}) => {
    const response = await Comment.findOneAndUpdate(match, data, { new: true })
      .populate('author', 'username avatar')
      .populate('deletedBy', 'username');
    return response;
  },
};

export { CommentSocket };

export default commentService;
