import titleApi from "api/titleApi";

const updateTitle = async (id, data, setProgress) => {
  const response = await titleApi.update(id, data, setProgress);
  return response;
};

export default updateTitle;
