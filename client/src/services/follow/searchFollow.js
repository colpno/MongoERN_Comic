import followApi from "api/followApi";
import { useEffect, useState } from "react";

const searchFollow = (key, value) => {
  const [follows, setFollows] = useState([]);
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const fetchFollows = async () => {
      try {
        const response = await followApi.search({ [key]: value });
        setFollows(response);
        setTitles(response.map((follow) => follow.title));
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchFollows();
  }, []);

  return { titles, setTitles, follows, setFollows };
};

export default searchFollow;
