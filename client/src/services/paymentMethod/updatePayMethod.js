import paymentMethodApi from "api/paymentMethodApi";

const updatePayMethod = async (id, method, setProgress) => {
  const response = await paymentMethodApi.update(id, method, setProgress);
  return response;
};

export default updatePayMethod;
