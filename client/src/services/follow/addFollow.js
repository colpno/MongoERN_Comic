import followApi from "api/followApi";

const addFollow = async (follow) => {
  const response = await followApi.add(follow);
  return response;
};

export default addFollow;
