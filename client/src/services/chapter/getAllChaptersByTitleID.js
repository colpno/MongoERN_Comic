import chapterApi from "api/chapterApi";
import { useEffect, useState } from "react";
import { convertChaptersPropertyToString } from "utils/convertArrayPropertyToString";

const getAllChaptersByTitleID = (titleId) => {
  const [chapters, setChapters] = useState([]);

  const fetchAllChapters = async (ID) => {
    try {
      const response = await chapterApi.getAll({ titleId: ID });
      const converted = convertChaptersPropertyToString(response);
      setChapters(converted);
    } catch (error) {
      // throw new Error(error);
    }
  };

  useEffect(() => {
    titleId && fetchAllChapters(titleId);
  }, [titleId]);

  return { chapters, setChapters, fetchAllChapters };
};

export default getAllChaptersByTitleID;
