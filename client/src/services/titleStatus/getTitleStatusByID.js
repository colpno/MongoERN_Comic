import titleStatusApi from "api/titleStatusApi";
import { useEffect, useState } from "react";

const getTitleStatusByID = (titleStatusID) => {
  const [titleStatus, setTitleStatus] = useState({});

  const fetchTitleStatus = async () => {
    try {
      const response = await titleStatusApi.getOneByID(titleStatusID);
      setTitleStatus(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchTitleStatus();
  }, [titleStatusID]);

  return { titleStatus, setTitleStatus };
};

export default getTitleStatusByID;
