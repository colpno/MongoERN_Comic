import chapterApi from "api/chapterApi";
import { useEffect, useState } from "react";
import { convertChaptersPropertyToString } from "utils/convertArrayPropertyToString";

const getAllChaptersByTitleID = (titleId) => {
  const [chapters, setChapters] = useState([]);

  const fetchAllChapters = async () => {
    try {
      const response = await chapterApi.filter({ titleId });
      const converted = convertChaptersPropertyToString(response);
      setChapters(converted);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchAllChapters();
  }, [titleId]);

  return { chapters, setChapters };
};

export default getAllChaptersByTitleID;
