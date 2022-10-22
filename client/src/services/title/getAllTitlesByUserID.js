import titleApi from "api/titleApi";
import { useEffect, useState } from "react";
import { convertTitlesPropertyToString } from "utils/convertArrayPropertyToString";

const getAllTitlesByUserID = (ID) => {
  const [titles, setTitles] = useState([]);

  const fetchLimitTitles = async () => {
    try {
      const response = await titleApi.getAllByUserID(ID);
      const converted = convertTitlesPropertyToString(response.data);
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
