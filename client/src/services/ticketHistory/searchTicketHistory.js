import ticketHistoryApi from "api/ticketHistoryApi";
import { useEffect, useState } from "react";
import { convertTicketHistoryPropertyToString } from "utils/convertArrayPropertyToString";

const searchTicketHistory = (key, value) => {
  const [ticketHistories, setTicketHistories] = useState([]);

  useEffect(() => {
    const fetchTicketHistories = async () => {
      try {
        const response = await ticketHistoryApi.search({ [key]: value });
        const converted = convertTicketHistoryPropertyToString(response);
        setTicketHistories(converted);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchTicketHistories();
  }, []);

  return { ticketHistories, setTicketHistories };
};

export default searchTicketHistory;
