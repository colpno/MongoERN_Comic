import paymentMethodApi from "api/paymentMethodApi";

const updatePayMethod = async (id, method) => {
  const response = await paymentMethodApi.update(id, method);
  return response;
};

export default updatePayMethod;
