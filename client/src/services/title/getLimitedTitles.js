import titleApi from "api/titleApi";
import { useEffect, useState } from "react";
import { convertTitlesPropertyToString } from "utils/convertArrayPropertyToString";

const getLimitedTitles = (limit) => {
  const [titles, setTitles] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  const fetchLimitTitles = async () => {
    try {
      const response = await titleApi.getAll({
        _page: pagination.page,
        _limit: pagination.limit,
      });
      const converted = convertTitlesPropertyToString(response.data);
      setTitles(converted);
      setPagination((prev) => {
        return { ...prev, total: response.pagination.total };
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitTitles();
  }, [pagination.page]);

  return { titles, setTitles, pagination, setPagination };
};

export default getLimitedTitles;
