import titleApi from "api/titleApi";
import { useEffect, useState } from "react";
import { convertTitlesPropertyToString } from "utils/convertArrayPropertyToString";

const searchTitle = (key, value) => {
  const [titles, setTitles] = useState([]);
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await titleApi.search(key, value);
        const converted = convertTitlesPropertyToString(response);
        setTitles(converted);
        setReFetch(false);
      } catch (error) {
        throw new Error(error);
      }
    };

    reFetch && fetchTitles();
  }, [reFetch]);

  return { titles, setTitles, setReFetch };
};

export default searchTitle;
