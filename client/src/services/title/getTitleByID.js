import titleApi from "api/titleApi";
import { useEffect, useState } from "react";

const getTitleByID = (ID) => {
  const [title, setTitle] = useState({});

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await titleApi.getOneById(ID);
        setTitle(response);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchTitles();
  }, []);

  return { title, setTitle };
};

export default getTitleByID;
