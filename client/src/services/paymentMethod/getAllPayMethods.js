import paymentMethodApi from "api/paymentMethodApi";

const getAllPayMethods = async (params = {}) => {
  try {
    const response = await paymentMethodApi.getAll(params);
    return response;
  } catch (error) {
    return error?.data?.error || error?.data?.message;
  }
};

export default getAllPayMethods;
