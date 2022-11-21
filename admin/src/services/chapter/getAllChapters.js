import chapterApi from "api/chapterApi";
import { useEffect, useState } from "react";
import { convertChaptersPropertyToString } from "utils/convertArrayPropertyToString";

const getAllChapters = () => {
  const [chapters, setChapters] = useState([]);

  const fetchAllChapters = async () => {
    try {
      const response = await chapterApi.getAll();
      const converted = convertChaptersPropertyToString(response);
      setChapters(converted);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchAllChapters();
  }, []);

  return { chapters, setChapters };
};

export default getAllChapters;
