import approvedStatusApi from "api/approvedStatusApi";
import { useEffect, useState } from "react";

const getApprovedStatusByID = (approvedStatusID) => {
  const [approvedStatus, setApprovedStatus] = useState({});

  const fetchApprovedStatus = async () => {
    try {
      const response = await approvedStatusApi.getOneByID(approvedStatusID);
      setApprovedStatus(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchApprovedStatus();
  }, [approvedStatusID]);

  return { approvedStatus, setApprovedStatus };
};

export default getApprovedStatusByID;
