import chapterApi from "api/chapterApi";
import { useEffect, useState } from "react";

const searchChapter = (key, value) => {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await chapterApi.search({ [key]: value });
        setChapters(response);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchChapters();
  }, []);

  return { chapters, setChapters };
};

export default searchChapter;
