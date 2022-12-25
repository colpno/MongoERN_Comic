import chapterApi from "api/chapterApi";

const chapterService = {
  getAll: async (params = {}, isPrivate = true) => {
    try {
      const response = await chapterApi.getAll(params, isPrivate);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  getOne: async (chapterID, isPrivate = true) => {
    try {
      const response = await chapterApi.getOne(chapterID, isPrivate);
      return response[0];
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  add: async (chapter, setProgress) => {
    try {
      const response = await chapterApi.add(chapter, setProgress);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  update: async (id, data, setProgress) => {
    try {
      const response = await chapterApi.update(id, data, setProgress);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  delete: async (id, setProgress) => {
    try {
      const response = await chapterApi.delete(id, setProgress);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
};

export default chapterService;
