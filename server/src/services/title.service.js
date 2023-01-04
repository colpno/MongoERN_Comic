import paginateSort from '../helpers/paginateSort.js';
import { Title } from '../models/index.js';
import cloudinaryService from './cloudinary.service.js';

const cloudOptions = (id, path = '') => ({
  upload_preset: process.env.CLOUDINARY_TITLE_UPLOAD_PRESET,
  folder: `comic/titles/${id}/${path}`,
});

const sortGenres = (titles) => {
  const sorted = titles.map((title) => {
    const sortedGenres = title.genres.sort();
    // eslint-disable-next-line no-param-reassign
    title.genres = sortedGenres;
    return title;
  });
  return sorted;
};

const titleService = {
  getAll: async (params = {}) => {
    const { _page, _limit, _sort, _order, _fields, ...others } = params;

    if (_limit || (_sort && _order)) {
      const response = await paginateSort(params, Title);
      return response;
    }

    const response = await Title.find(others).select(_fields);
    return { data: sortGenres(response) };
  },
  getOne: async (params = {}) => {
    const response = await Title.findOne(params);
    return response;
  },
  random: async (count, params = {}) => {
    const response = await Title.aggregate([{ $match: params }, { $sample: { size: +count } }]);
    return response;
  },
  add: async (
    userId = '',
    releaseDay = '',
    title = '',
    status = '',
    cover = {},
    author = '',
    summary = '',
    genres = [],
    coin = 0,
    point = 0,
    guid = ''
  ) => {
    const model = new Title({
      user_id: userId,
      release_day: releaseDay,
      title,
      status,
      cover,
      author,
      summary,
      genres,
      coin,
      point,
      _guid: guid,
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
      { $inc: { view: 1 } },
      { new: true, timestamps: false }
    );
    return response;
  },
  increaseLike: async (id, value = 1) => {
    const response = await Title.findOneAndUpdate(
      { _id: id },
      { $inc: { like: value } },
      { new: true, timestamps: false }
    );
    return response;
  },
  delete: async (id) => {
    const response = await Title.findOneAndDelete({ _id: id });
    return response;
  },
  uploadToCloud: async (cover, titleGuid) => {
    const finalCover = cover
      ? await cloudinaryService.upload(cover, cloudOptions(titleGuid, 'cover'))
      : undefined;

    return finalCover;
  },
  removeFromCloud: async (publicId) => {
    await cloudinaryService.remove(publicId);
  },
};

export default titleService;
