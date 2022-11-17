import paymentMethodApi from "api/paymentMethodApi";

const deletePayMethod = async (id, setProgress) => {
  const response = await paymentMethodApi.delete(id, setProgress);
  return response;
};

export default deletePayMethod;
