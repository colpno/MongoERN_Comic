import titleApi from "api/titleApi";
import { useEffect, useState } from "react";
import { convertTitlesPropertyToString } from "utils/convertArrayPropertyToString";

const getAllTitlesByProperty = (key, value) => {
  const [titles, setTitles] = useState([]);

  const fetchLimitTitles = async () => {
    try {
      const response = await titleApi.getAllByProperty({ [key]: value });
      const converted = convertTitlesPropertyToString(response);
      setTitles(converted);
    } catch (error) {
      // console.log(error);
      // throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitTitles();
  }, []);

  return { titles, setTitles };
};

export default getAllTitlesByProperty;
