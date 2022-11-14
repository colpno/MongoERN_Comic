import chapterApi from "api/chapterApi";
import { useEffect, useState } from "react";
import { convertChapterPropertyToString } from "utils/convertArrayPropertyToString";

const getChapterByTitleID = (chapterID, titleID) => {
  const [chapter, setChapter] = useState({});

  const fetchChapterByTitleID = async () => {
    try {
      const response = await chapterApi.getOneByID(chapterID, titleID);
      const converted = convertChapterPropertyToString(response);
      setChapter(converted);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchChapterByTitleID();
  }, [chapterID]);

  return { chapter, setChapter };
};

export default getChapterByTitleID;