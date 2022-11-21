import titleApi from "api/titleApi";
import { useEffect, useState } from "react";
import { convertTitlesPropertyToString } from "utils/convertArrayPropertyToString";

const getAllTitles = () => {
  const [titles, setTitles] = useState([]);

  const fetchAllTitles = async () => {
    try {
      const response = await titleApi.getAll();
      const converted = convertTitlesPropertyToString(response);
      setTitles(converted);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchAllTitles();
  }, []);

  return { titles, setTitles };
};

export default getAllTitles;
