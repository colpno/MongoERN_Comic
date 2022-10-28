import titleApi from "api/titleApi";
import { useEffect, useState } from "react";
import { convertTitlePropertyToString } from "utils/convertArrayPropertyToString";

const getTitleByID = (ID) => {
  const [title, setTitle] = useState({});

  const fetchTitle = async () => {
    try {
      const response = await titleApi.getOneByID(ID);
      const converted = convertTitlePropertyToString(response);
      setTitle(converted);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchTitle();
  }, []);

  return { title, setTitle };
};

export default getTitleByID;
