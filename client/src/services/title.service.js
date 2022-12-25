import titleApi from "api/titleApi";

const titleService = {
  getAll: async (params = {}, isPrivate = false) => {
    try {
      const response = await titleApi.getAll(params, isPrivate);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  getOne: async (id, isPrivate = false) => {
    try {
      const response = await titleApi.getOne(id, isPrivate);
      return response[0];
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  add: async (
    approvedStatusId,
    releaseDay,
    title,
    cover,
    author,
    summary,
    genres,
    coin,
    point,
    setProgress = () => {}
  ) => {
    try {
      const response = await titleApi.add(
        approvedStatusId,
        releaseDay,
        title,
        cover,
        author,
        summary,
        genres,
        coin,
        point,
        setProgress
      );
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  update: async (id, data = {}, setProgress = () => {}) => {
    try {
      const response = await titleApi.update(id, data, setProgress);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  delete: async (id, setProgress = () => {}) => {
    try {
      const response = await titleApi.delete(id, setProgress);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
};

export default titleService;
