import chapterApi from "api/chapterApi";
import { useEffect, useState } from "react";
import { convertChapterPropertyToString } from "utils/convertArrayPropertyToString";

const getChapterByID = (chapterID) => {
  const [chapter, setChapter] = useState({});

  const fetchChapter = async () => {
    try {
      const response = await chapterApi.getOneByID(chapterID);
      const converted = convertChapterPropertyToString(response);
      setChapter(converted);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchChapter();
  }, [chapterID]);

  return { chapter, setChapter };
};

export default getChapterByID;
