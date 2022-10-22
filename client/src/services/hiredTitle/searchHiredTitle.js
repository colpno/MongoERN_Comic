import hiredTitleApi from "api/hiredTitleApi";
import { useEffect, useState } from "react";

const searchHiredTitle = (key, value) => {
  const [hiredTitles, setHiredTitles] = useState([]);

  useEffect(() => {
    const fetchHiredTitles = async () => {
      try {
        const response = await hiredTitleApi.search({ [key]: value });
        setHiredTitles(response);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchHiredTitles();
  }, []);

  return { hiredTitles, setHiredTitles };
};

export default searchHiredTitle;
