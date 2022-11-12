import titleApi from "api/titleApi";

const deleteTitle = async (id, data, setProgress) => {
  const response = await titleApi.delete(id, data, setProgress);
  return response;
};

export default deleteTitle;
