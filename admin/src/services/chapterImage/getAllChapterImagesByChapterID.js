import chapterImageApi from "api/chapterImageApi";
import { useEffect, useState } from "react";

const getAllChapterImagesByChapterID = (chapterId) => {
  const [chapterImages, setChapterImages] = useState([]);

  const fetchAllChapters = async (chapterID) => {
    try {
      const response = await chapterImageApi.sort(chapterID, "order", "asc");
      setChapterImages(response);
      return response;
    } catch (error) {
      throw new Error(error.data.error);
    }
  };

  useEffect(() => {
    chapterId && setChapterImages(fetchAllChapters(chapterId));
  }, [chapterId]);

  return { chapterImages, setChapterImages, refetch: fetchAllChapters };
};

export default getAllChapterImagesByChapterID;
