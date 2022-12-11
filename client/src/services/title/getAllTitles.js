import titleApi from "api/titleApi";
import { useEffect, useState } from "react";
import { convertTitlesPropertyToString } from "utils/convertArrayPropertyToString";

const getAllTitles = (properties) => {
  const [titles, setTitles] = useState([]);

  const fetchAllTitles = async (props) => {
    try {
      const response = await titleApi.getAll(props);
      const converted = convertTitlesPropertyToString(response);
      setTitles(converted);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    properties && fetchAllTitles(properties);
  }, []);

  return { titles, setTitles };
};

export default getAllTitles;
