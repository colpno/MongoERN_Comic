import titleApi from "api/titleApi";
import { useEffect, useState } from "react";
import { convertTitlePropertyToString } from "utils/convertArrayPropertyToString";

const searchTitle = (key, value) => {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await titleApi.search({ [key]: value });
        const converted = convertTitlePropertyToString(response);
        setTitles(converted);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchTitles();
  }, []);

  return { titles, setTitles };
};

export default searchTitle;
