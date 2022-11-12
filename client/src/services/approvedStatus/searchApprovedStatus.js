import approvedStatusApi from "api/approvedStatusApi";
import { useEffect, useState } from "react";

const searchApprovedStatus = (key, value) => {
  const [approvedStatuses, setApprovedStatuses] = useState([]);

  useEffect(() => {
    const fetchApprovedStatuses = async () => {
      try {
        const response = await approvedStatusApi.search({ [key]: value });
        setApprovedStatuses(response);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchApprovedStatuses();
  }, []);

  return { approvedStatuses, setApprovedStatuses };
};

export default searchApprovedStatus;
