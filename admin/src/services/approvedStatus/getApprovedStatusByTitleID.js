import approvedStatusApi from "api/approvedStatusApi";
import { useEffect, useState } from "react";

const getApprovedStatusByTitleID = (approvedStatusID, titleID) => {
  const [approvedStatus, setApprovedStatus] = useState({});

  const fetchApprovedStatusByTitleID = async () => {
    try {
      const response = await approvedStatusApi.getOneByID(
        approvedStatusID,
        titleID
      );
      setApprovedStatus(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchApprovedStatusByTitleID();
  }, [approvedStatusID]);

  return { approvedStatus, setApprovedStatus };
};

export default getApprovedStatusByTitleID;
