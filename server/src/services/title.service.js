import paginateSort from '../helpers/paginateSort.js';
import { Title } from '../models/index.js';

const titleService = {
  getAll: async (params = {}) => {
    const { _page, _limit, _sort, _order } = params;

    if ((_page && _limit) || (_sort && _order)) {
      const response = await paginateSort(params, Title);
      return response;
    }

    const response = await Title.find(params);
    return response;
  },
  getOne: async (params = {}) => {
    const response = await Title.findOne(params);
    return response;
  },
  add: async (
    userId = '',
    approvedStatusId = '',
    releaseDay = '',
    title = '',
    cover = '',
    author = '',
    summary = '',
    genres = [],
    coin = 0,
    point = 0,
    cloudPublicId = ''
  ) => {
    const model = new Title({
      user_id: userId,
      approved_status_id: approvedStatusId,
      release_day: releaseDay,
      title,
      cover,
      author,
      summary,
      genres,
      coin,
      point,
      cloud_public_id: cloudPublicId,
    });

    const response = await model.save();
    return response;
  },
  update: async (id, data = {}) => {
    const response = await Title.findOneAndUpdate({ _id: id }, data, { new: true });
    return response;
  },
  increaseView: async (id) => {
    const response = await Title.findOneAndUpdate(
      { _id: id },
      { $inc: { views: 1 } },
      { new: true, timestamps: false }
    );
    return response;
  },
  increaseLike: async (id) => {
    const response = await Title.findOneAndUpdate(
      { _id: id },
      { $inc: { likes: 1 } },
      { new: true, timestamps: false }
    );
    return response;
  },
  delete: async (id) => {
    const response = await Title.findOneAndDelete({ _id: id });
    return response;
  },
};

export default titleService;
