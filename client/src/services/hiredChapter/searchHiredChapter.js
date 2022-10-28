import hiredTitleApi from "api/hiredTitleApi";
import { useEffect, useState } from "react";

const searchHiredTitle = (key, value) => {
  const [hiredChapters, setHiredChapters] = useState([]);

  useEffect(() => {
    const fetchHiredChapters = async () => {
      try {
        const response = await hiredTitleApi.search({ [key]: value });
        setHiredChapters(response);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchHiredChapters();
  }, []);

  return { hiredChapters, setHiredChapters };
};

export default searchHiredTitle;
