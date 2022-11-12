import paymentMethodApi from "api/paymentMethodApi";

const deletePayMethod = async (id) => {
  const response = await paymentMethodApi.delete(id);
  return response;
};

export default deletePayMethod;
