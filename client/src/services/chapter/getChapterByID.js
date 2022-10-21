import chapterApi from "api/chapterApi";
import { useEffect, useState } from "react";

const getChapterByID = (ID) => {
  const [chapter, setChapter] = useState({});

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await chapterApi.getOneById(ID);
        setChapter(response);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchChapters();
  }, []);

  return { chapter, setChapter };
};

export default getChapterByID;
