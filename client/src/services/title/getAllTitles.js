import titleApi from "api/titleApi";

const getAllTitles = async (params = {}, isPrivate = true) => {
  try {
    const response = await titleApi.getAll(params, isPrivate);
    return response;
  } catch (error) {
    return error?.data?.error || error?.data?.message;
  }
};

export default getAllTitles;
