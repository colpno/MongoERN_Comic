import paymentMethodApi from "api/paymentMethodApi";
import { useEffect, useState } from "react";

const filterPayMethod = (property) => {
  const [payMethods, setPayMethods] = useState([]);
  const [titles, setTitles] = useState([]);

  const fetch = async (prop) => {
    try {
      const response = await paymentMethodApi.filter(prop);
      setPayMethods(response);
      setTitles(response.map((payMethod) => payMethod.title));
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    property && fetch(property);
  }, []);

  return { titles, setTitles, payMethods, setPayMethods, fetch };
};

export default filterPayMethod;
