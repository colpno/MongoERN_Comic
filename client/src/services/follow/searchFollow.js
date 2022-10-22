import followApi from "api/followApi";
import { useEffect, useState } from "react";

const searchFollow = (key, value) => {
  const [follows, setFollows] = useState([]);

  useEffect(() => {
    const fetchFollows = async () => {
      try {
        const response = await followApi.search({ [key]: value });
        setFollows(response);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchFollows();
  }, []);

  return { follows, setFollows };
};

export default searchFollow;
