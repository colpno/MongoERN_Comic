import purchasedChapterApi from "api/purchasedChapterApi";
import { useEffect, useState } from "react";

const getAllPurchasedChapters = () => {
  const [purchasedChapters, setPurchasedChapters] = useState([]);

  const fetchLimitPurchasedChapters = async () => {
    try {
      const response = await purchasedChapterApi.getAll();
      setPurchasedChapters(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitPurchasedChapters();
  }, []);

  return { purchasedChapters, setPurchasedChapters };
};

export default getAllPurchasedChapters;
