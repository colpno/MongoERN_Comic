import titleApi from "api/titleApi";

const addTitle = async (title, setProgress) => {
  const response = await titleApi.add(title, setProgress);
  return response;
};

export default addTitle;
