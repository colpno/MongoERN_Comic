import paymentMethodApi from "api/paymentMethodApi";

const addPayMethod = async (method) => {
  const response = await paymentMethodApi.add(method);
  return response;
};

export default addPayMethod;
