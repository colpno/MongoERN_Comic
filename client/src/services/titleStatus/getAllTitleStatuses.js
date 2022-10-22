import titleStatusApi from "api/titleStatusApi";
import { useEffect, useState } from "react";

const getAllTitleStatuses = () => {
  const [titleStatuses, setTitleStatuses] = useState([]);

  const fetchAllTitleStatuses = async () => {
    try {
      const response = await titleStatusApi.getAll();
      setTitleStatuses(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchAllTitleStatuses();
  }, []);

  return { titleStatuses, setTitleStatuses };
};

export default getAllTitleStatuses;
