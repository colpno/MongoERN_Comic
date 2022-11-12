import followApi from "api/followApi";

const deleteFollow = async (guid) => {
  const response = await followApi.delete(guid);
  return response;
};

export default deleteFollow;
