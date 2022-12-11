import titleApi from "api/titleApi";
import { useEffect, useState } from "react";
import { convertTitlesPropertyToString } from "utils/convertArrayPropertyToString";

const getAllTitlesByProperty = (properties) => {
  const [titles, setTitles] = useState([]);

  const fetchLimitTitles = async () => {
    try {
      const response = await titleApi.getAll(properties);
      const converted = convertTitlesPropertyToString(response);
      setTitles(converted);
    } catch (error) {
      console.log("file: getAllTitlesByProperty.js:14 ~ error", error);
    }
  };

  useEffect(() => {
    fetchLimitTitles();
  }, []);

  return { titles, setTitles };
};

export default getAllTitlesByProperty;
