import ticketHistoryApi from "api/ticketHistoryApi";
import { convertTicketHistoriesPropertyToString } from "utils/convertArrayPropertyToString";

const getAllTicketHistories = async (params = {}) => {
  try {
    const response = await ticketHistoryApi.getAll(params);
    const converted = convertTicketHistoriesPropertyToString(response);
    return converted;
  } catch (error) {
    return error.data.error || error.data.message;
  }
};

export default getAllTicketHistories;
