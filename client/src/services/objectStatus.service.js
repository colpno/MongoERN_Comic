import objectStatusApi from "api/objectStatus.api";

const objectStatusService = {
  getAll: async (params = {}) => {
    try {
      const response = await objectStatusApi.getAll(params);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  getOne: async (objectStatusID, params) => {
    try {
      const response = await objectStatusApi.getOne(objectStatusID, params);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default objectStatusService;
