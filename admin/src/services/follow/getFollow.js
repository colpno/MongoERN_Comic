import followApi from "api/followApi";
import { useEffect, useState } from "react";

const getFollow = (userID, titleID) => {
  const [follow, setFollow] = useState([]);

  const fetchLimitFollows = async () => {
    try {
      const response = await followApi.getOne(userID, titleID);
      setFollow(response[0]);
    } catch (error) {
      // console.log("file: getFollow.js ~ line 12 ~ error", error);
      // throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitFollows();
  }, []);

  return {
    follow,
    setFollow,
    fetchLimitFollows,
  };
};

export default getFollow;
