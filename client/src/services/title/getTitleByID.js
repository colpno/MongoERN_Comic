import titleApi from "api/titleApi";
import { useEffect, useState } from "react";
import { convertTitlePropertyToString } from "utils/convertArrayPropertyToString";

const getTitleByID = (ID) => {
  const [title, setTitle] = useState({});

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await titleApi.getOneByID(ID);
        const converted = convertTitlePropertyToString(response);
        setTitle(converted);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchTitles();
  }, []);

  return { title, setTitle };
};

export default getTitleByID;
