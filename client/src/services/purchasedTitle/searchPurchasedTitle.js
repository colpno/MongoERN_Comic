import purchasedTitleApi from "api/purchasedTitleApi";
import { useEffect, useState } from "react";

const searchPurchasedTitle = (key, value) => {
  const [purchasedTitles, setPurchasedTitles] = useState([]);

  useEffect(() => {
    const fetchPurchasedTitles = async () => {
      try {
        const response = await purchasedTitleApi.search({ [key]: value });
        setPurchasedTitles(response);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchPurchasedTitles();
  }, []);

  return { purchasedTitles, setPurchasedTitles };
};

export default searchPurchasedTitle;
