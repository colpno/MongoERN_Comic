import paginateSort from '../helpers/paginateSort.js';
import { Chapter, Title } from '../models/index.js';
import cloudinaryService from './cloudinary.service.js';

const cloudOptions = (titleGuid, chapterGuid, path = '') => ({
  upload_preset: process.env.CLOUDINARY_TITLE_UPLOAD_PRESET,
  folder: `comic/titles/${titleGuid}/chapters/${chapterGuid}/${path}`,
});

const uploadCover = async (cover, titleGuid, chapterGuid) => {
  const response = await cloudinaryService.upload(
    cover,
    cloudOptions(titleGuid, chapterGuid, 'cover')
  );
  return response;
};

const uploadContents = async (contents, titleGuid, chapterGuid) => {
  const promises = contents.map(async (content) => {
    const finalContent = await cloudinaryService.upload(
      content,
      cloudOptions(titleGuid, chapterGuid, 'contents')
    );

    return finalContent;
  });

  const finalContents = await Promise.all(promises);

  return finalContents;
};

const chapterService = {
  getAll: async (params = {}) => {
    const { _page, _limit, _sort, _order, _fields, _embed, ...others } = params;

    if (_limit || (_sort && _order)) {
      const response = await paginateSort(params, Chapter);
      return response;
    }

    const response = await Chapter.find(others).select(_fields).populate(_embed);
    return { data: response };
  },
  getOne: async (params = {}) => {
    const response = await Chapter.findOne(params);
    return response;
  },
  add: async (
    titleId = '',
    title = '',
    cover = {},
    contents = [],
    order = 1,
    cost = false,
    guid = ''
  ) => {
    const model = new Chapter({
      title_id: titleId,
      title,
      cover,
      contents,
      order,
      cost,
      _guid: guid,
    });

    const response = await model.save();
    return response;
  },
  update: async (id, data = {}) => {
    const response = await Chapter.findOneAndUpdate({ _id: id }, data);
    return response;
  },
  increaseView: async (id, value = 1) => {
    const response = await Chapter.findOneAndUpdate(
      { _id: id },
      { $inc: { view: value } },
      { new: true, timestamps: false }
    );
    return response;
  },
  increaseLike: async (id, value = 1) => {
    const response = await Chapter.findOneAndUpdate(
      { _id: id },
      { $inc: { like: value } },
      { new: true, timestamps: false }
    );
    return response;
  },
  delete: async (id) => {
    const response = await Chapter.findOneAndDelete({ _id: id });
    return response;
  },
  uploadToCloud: async (cover, contents, titleId, chapterGuid) => {
    const titleObject = cover || contents ? await Title.findById(titleId) : undefined;

    const finalCover = cover ? await uploadCover(cover, titleObject._guid, chapterGuid) : undefined;

    const finalContents =
      contents?.length > 0
        ? await uploadContents(contents, titleObject._guid, chapterGuid)
        : undefined;

    return { finalCover, finalContents };
  },
  removeFromCloud: async (coverPublicId, contentsPublicId) => {
    coverPublicId && (await cloudinaryService.remove(coverPublicId));

    const promises = contentsPublicId?.map(async (publicId) => {
      const cloudResponse = await cloudinaryService.remove(publicId);
      return cloudResponse;
    });

    await Promise.all(promises);
  },
};

export default chapterService;
