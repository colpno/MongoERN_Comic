import paymentMethodApi from "api/paymentMethodApi";

const addPayMethod = async (method, setProgress) => {
  const response = await paymentMethodApi.add(method, setProgress);
  return response;
};

export default addPayMethod;
