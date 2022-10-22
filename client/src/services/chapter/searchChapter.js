import chapterApi from "api/chapterApi";
import { useEffect, useState } from "react";
import { convertChapterPropertyToString } from "utils/convertArrayPropertyToString";

const searchChapter = (key, value) => {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await chapterApi.search({ [key]: value });
        const converted = convertChapterPropertyToString(response);
        setChapters(converted);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchChapters();
  }, []);

  return { chapters, setChapters };
};

export default searchChapter;
