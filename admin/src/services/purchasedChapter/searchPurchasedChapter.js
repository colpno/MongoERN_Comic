import purchasedChapterApi from "api/purchasedChapterApi";
import { useEffect, useState } from "react";

const searchPurchasedChapter = (key, value) => {
  const [purchasedChapters, setPurchasedChapters] = useState([]);

  useEffect(() => {
    const fetchPurchasedChapters = async () => {
      try {
        const response = await purchasedChapterApi.search({ [key]: value });
        setPurchasedChapters(response);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchPurchasedChapters();
  }, []);

  return { purchasedChapters, setPurchasedChapters };
};

export default searchPurchasedChapter;
