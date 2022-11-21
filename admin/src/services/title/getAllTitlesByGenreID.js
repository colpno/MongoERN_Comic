import titleApi from "api/titleApi";
import { useEffect, useState } from "react";
import { convertTitlesPropertyToString } from "utils/convertArrayPropertyToString";

const getAllTitlesByGenreID = (ID) => {
  const [titles, setTitles] = useState([]);

  const fetchTitles = async () => {
    try {
      const response = await titleApi.getAllByProperty({ genreId: ID });
      const converted = convertTitlesPropertyToString(response);
      setTitles(converted);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchTitles();
  }, []);

  return { titles, setTitles };
};

export default getAllTitlesByGenreID;
