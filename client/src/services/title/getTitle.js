import titleApi from "api/titleApi";

const getTitle = async (ID, isPrivate = true) => {
  try {
    const response = await titleApi.getOne(ID, isPrivate);
    return response[0];
  } catch (error) {
    return error?.data?.error || error?.data?.message;
  }
};

export default getTitle;
