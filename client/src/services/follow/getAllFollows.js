import followApi from "api/followApi";

const getAllFollows = async (params = {}) => {
  try {
    const response = await followApi.getAll(params);
    return response;
  } catch (error) {
    return error.data.error || error.data.message;
  }
};

export default getAllFollows;
