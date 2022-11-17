import titleApi from "api/titleApi";
import { useEffect, useState } from "react";
import { convertTitlesPropertyToString } from "utils/convertArrayPropertyToString";

const getAllTitlesByUserID = (ID) => {
  const [titles, setTitles] = useState([]);

  const fetchLimitTitles = async () => {
    try {
      const response = await titleApi.getAllByProperty({ userId: ID });
      const converted = convertTitlesPropertyToString(response);
      setTitles(converted);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitTitles();
  }, []);

  return { titles, setTitles };
};

export default getAllTitlesByUserID;
