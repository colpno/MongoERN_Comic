import titleApi from "api/titleApi";
import { useEffect, useState } from "react";
import { convertTitlesPropertyToString } from "utils/convertArrayPropertyToString";

const getAllTitles = (options) => {
  const [titles, setTitles] = useState([]);

  const fetchAllTitles = async (opts) => {
    try {
      const response = await titleApi.getAll(opts);
      const converted = convertTitlesPropertyToString(response);
      setTitles(converted);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    options && fetchAllTitles(options);
  }, []);

  return { titles, setTitles };
};

export default getAllTitles;
