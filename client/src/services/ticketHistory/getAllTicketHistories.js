import ticketHistoryApi from "api/ticketHistoryApi";

const getAllTicketHistories = async (params = {}) => {
  try {
    const response = await ticketHistoryApi.getAll(params);
    return response;
  } catch (error) {
    return error?.data?.error || error?.data?.message;
  }
};

export default getAllTicketHistories;
