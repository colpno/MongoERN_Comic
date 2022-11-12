import chapterImageApi from "api/chapterImageApi";
import { useEffect, useState } from "react";

const getAllChapterImagesByChapterID = (chapterId) => {
  const [chapterImages, setChapterImages] = useState([]);

  const fetchAllChapters = async (chapterID) => {
    try {
      const id = chapterId || chapterID;
      const response = await chapterImageApi.sort(id, "order", "asc");
      setChapterImages(response);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    chapterId && setChapterImages(fetchAllChapters());
  }, [chapterId]);

  return { chapterImages, setChapterImages, refetch: fetchAllChapters };
};

export default getAllChapterImagesByChapterID;
