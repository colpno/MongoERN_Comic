import payMethodApi from "api/payMethodApi";
import { useEffect, useState } from "react";

const getAllPayMethods = () => {
  const [payMethods, setPayMethods] = useState([]);

  const fetchLimitPayMethods = async () => {
    try {
      const response = await payMethodApi.getAll();
      setPayMethods(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitPayMethods();
  }, []);

  return {
    payMethods,
    setPayMethods,
  };
};

export default getAllPayMethods;
