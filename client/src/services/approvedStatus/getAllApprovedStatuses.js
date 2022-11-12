import approvedStatusApi from "api/approvedStatusApi";
import { useEffect, useState } from "react";

const getAllApprovedStatuses = () => {
  const [approvedStatuses, setApprovedStatuses] = useState([]);

  const fetchAllApprovedStatuses = async () => {
    try {
      const response = await approvedStatusApi.getAll();
      setApprovedStatuses(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchAllApprovedStatuses();
  }, []);

  return { approvedStatuses, setApprovedStatuses };
};

export default getAllApprovedStatuses;
