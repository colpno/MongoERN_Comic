import titleStatusApi from "api/titleStatusApi";
import { useEffect, useState } from "react";

const getTitleStatusByTitleID = (titleStatusID, titleID) => {
  const [titleStatus, setTitleStatus] = useState({});

  const fetchTitleStatusByTitleID = async () => {
    try {
      const response = await titleStatusApi.getOneByID(titleStatusID, titleID);
      setTitleStatus(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchTitleStatusByTitleID();
  }, [titleStatusID]);

  return { titleStatus, setTitleStatus };
};

export default getTitleStatusByTitleID;
