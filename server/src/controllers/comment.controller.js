import createError from 'http-errors';

import transformQueryParams from '../helpers/transformQueryParams.js';
import { commentService, titleService } from '../services/index.js';

const commentController = {
  getAll: async (req, res, next) => {
    try {
      const { slug } = req.query;
      if (!!slug) {
        req.query.full_slug_like = slug;
        delete req.query.slug;
      }
      req.query._sort = 'full_slug';
      req.query._order = 'desc';

      const params = transformQueryParams(req.query);

      const response = await commentService.getAll(params);

      if (response.length === 0 || response.data?.length === 0) {
        return res.status(200).json({
          ...response,
          code: 200,
        });
      }

      return res.status(200).json({
        ...response,
        code: 200,
      });
    } catch (error) {
      return next(error);
    }
  },
  add: async (req, res, next) => {
    try {
      const { author, commentAt, text, parentSlug } = req.body;

      let slug = '';
      let fullSlug = '';
      if (parentSlug) {
        const parent = await commentService.getOne({ slug: parentSlug });

        slug = `${parent.slug}/`;
        fullSlug = `${parent.full_slug}/`;
      }

      const response = await commentService.add(
        author,
        commentAt,
        text,
        slug,
        parentSlug,
        fullSlug
      );

      if (!response) {
        return next(createError(400, 'Không thể hoàn thành việc tạo bình luận'));
      }

      if (parentSlug) {
        await commentService.update({ slug: parentSlug }, { $inc: { comment_replies_num: 1 } });
      }

      const splittedPlace = commentAt.split('_');
      if (splittedPlace[0] === 'title') {
        const titleId = splittedPlace[1];
        await titleService.increaseCommentNum(titleId);
      }

      const room = commentAt.slice(commentAt.indexOf('_') + 1);
      global.io.to(room).emit('send-comment', response);

      return res.status(201).json({
        code: 201,
        data: response,
      });
    } catch (error) {
      return next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { text, deletedBy } = req.body;
      const { id } = req.params;

      const match = { _id: id };
      const response = await commentService.update(match, {
        text,
        deletedBy,
      });

      if (!response) {
        return next(createError(400, 'không thể hoàn thành việc cập nhật bình luận'));
      }

      const { comment_at } = response;
      const room = comment_at.slice(comment_at.indexOf('_') + 1);
      global.io.to(room).emit('delete-comment', response);

      return res.status(200).json({
        code: 200,
        data: response,
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default commentController;
