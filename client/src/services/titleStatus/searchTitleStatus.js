import titleStatusApi from "api/titleStatusApi";
import { useEffect, useState } from "react";

const searchTitleStatus = (key, value) => {
  const [titleStatuses, setTitleStatuses] = useState([]);

  useEffect(() => {
    const fetchTitleStatuses = async () => {
      try {
        const response = await titleStatusApi.search({ [key]: value });
        setTitleStatuses(response);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchTitleStatuses();
  }, []);

  return { titleStatuses, setTitleStatuses };
};

export default searchTitleStatus;
