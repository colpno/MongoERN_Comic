import chapterApi from "api/chapterApi";
import { useEffect, useState } from "react";
import { convertChapterPropertyToString } from "utils/convertArrayPropertyToString";

const getChapterByID = (chapterID, titleID) => {
  const [chapter, setChapter] = useState({});

  const fetchChapter = async () => {
    try {
      const response = await chapterApi.getOneByID(chapterID, titleID);
      const converted = convertChapterPropertyToString(response[0]);
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
