import rentedTitleApi from "api/rentedTitleApi";
import { useEffect, useState } from "react";

const searchRentedTitle = (key, value) => {
  const [rentedTitles, setRentedTitles] = useState([]);

  useEffect(() => {
    const fetchRentedTitles = async () => {
      try {
        const response = await rentedTitleApi.search({ [key]: value });
        setRentedTitles(response);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchRentedTitles();
  }, []);

  return { rentedTitles, setRentedTitles };
};

export default searchRentedTitle;
