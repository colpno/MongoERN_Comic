import payMethodApi from "api/payMethodApi";
import { useEffect, useState } from "react";

const searchPayMethod = (key, value) => {
  const [payMethods, setPayMethods] = useState([]);
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const fetchPayMethods = async () => {
      try {
        const response = await payMethodApi.search({ [key]: value });
        setPayMethods(response);
        setTitles(response.map((payMethod) => payMethod.title));
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchPayMethods();
  }, []);

  return { titles, setTitles, payMethods, setPayMethods };
};

export default searchPayMethod;
