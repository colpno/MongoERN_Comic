import pointHistoryApi from "api/pointHistoryApi";
import { useEffect, useState } from "react";
import { convertPointHistoryPropertyToString } from "utils/convertArrayPropertyToString";

const searchPointHistory = (key, value) => {
  const [pointHistories, setPointHistories] = useState([]);

  useEffect(() => {
    const fetchPointHistories = async () => {
      try {
        const response = await pointHistoryApi.search({ [key]: value });
        const converted = convertPointHistoryPropertyToString(response);
        setPointHistories(converted);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchPointHistories();
  }, []);

  return { pointHistories, setPointHistories };
};

export default searchPointHistory;
