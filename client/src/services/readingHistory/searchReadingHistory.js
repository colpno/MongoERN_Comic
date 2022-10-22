import readingHistoryApi from "api/readingHistoryApi";
import { useEffect, useState } from "react";

const searchReadingHistory = (key, value) => {
  const [readingHistories, setReadingHistories] = useState([]);

  useEffect(() => {
    const fetchReadingHistories = async () => {
      try {
        const response = await readingHistoryApi.search({ [key]: value });
        setReadingHistories(response);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchReadingHistories();
  }, []);

  return { readingHistories, setReadingHistories };
};

export default searchReadingHistory;
