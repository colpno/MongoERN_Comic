import handleMongoProjection from '../helpers/handleMongoProjection.js';
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
    try {
      params._fields = handleMongoProjection(
        params._fields,
        '-__v -_guid -cover.cloud_public_id -content.cloud_public_id'
      );
      const { _page, _limit, _sort, _fields, _order, _embed, ...others } = params;

      if (_limit || (_sort && _order)) {
        const response = await paginateSort(params, Chapter);
        return response;
      }

      const response = await Chapter.find(others).select(_fields).populate(_embed);
      return { data: response };
    } catch (error) {
      throw new Error(error);
    }
  },
  getOne: async (params = {}) => {
    try {
      params._fields = handleMongoProjection(
        params._fields,
        '-__v -_guid -cover.cloud_public_id -content.cloud_public_id'
      );
      const { _fields, _embed, ...others } = params;

      const response = await Chapter.findOne(others).select(_fields).populate(_embed);
      return response;
    } catch (error) {
      throw new Error(error);
    }
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
    try {
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
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (id, data = {}) => {
    try {
      const response = await Chapter.findOneAndUpdate({ _id: id }, data, { new: true });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  increaseView: async (id, value = 1) => {
    try {
      const response = await Chapter.findOneAndUpdate(
        { _id: id },
        { $inc: { view: value } },
        { new: true, timestamps: false }
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  increaseLike: async (id, value = 1) => {
    try {
      const response = await Chapter.findOneAndUpdate(
        { _id: id },
        { $inc: { like: value } },
        { new: true, timestamps: false }
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (filter) => {
    try {
      const response = await Chapter.deleteMany(filter);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  uploadToCloud: async (cover, contents, titleId, chapterGuid) => {
    try {
      const titleObject = cover || contents ? await Title.findById(titleId) : undefined;

      const finalCover = cover
        ? await uploadCover(cover, titleObject._guid, chapterGuid)
        : undefined;

      const finalContents =
        contents?.length > 0
          ? await uploadContents(contents, titleObject._guid, chapterGuid)
          : undefined;

      return { finalCover, finalContents };
    } catch (error) {
      throw new Error(error);
    }
  },
  removeFromCloud: async (coverPublicId, contentsPublicId) => {
    try {
      coverPublicId && (await cloudinaryService.remove(coverPublicId));

      const promises = contentsPublicId?.map(async (publicId) => {
        const cloudResponse = await cloudinaryService.remove(publicId);
        return cloudResponse;
      });

      await Promise.all(promises);
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default chapterService;
