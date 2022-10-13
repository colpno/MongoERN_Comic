import titleApi from "api/titleApi";
import { useEffect, useState } from "react";

function titleService({ limit = 10 }) {
  const [titles, setTitles] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await titleApi.getAll({
          _limit: pagination.limit,
          _page: pagination.page,
        });
        setTitles(response.data);
        setPagination({ ...pagination, total: response.pagination.total });
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchTitles();
  }, []);

  return { titles, setTitles, pagination, setPagination };
}

export default titleService;
