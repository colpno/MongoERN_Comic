import titleApi from "api/titleApi";
import { useEffect, useState } from "react";
import { convertTitlesPropertyToString } from "utils/convertArrayPropertyToString";

const getLimitedTitlesByProperty = (property, limit) => {
  const [titles, setTitles] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit, total: 0 });

  const fetch = async (prop) => {
    try {
      const response = await titleApi.filter(prop, {
        page: pagination.page,
        limit: pagination.limit,
      });
      const converted = convertTitlesPropertyToString(response.data);
      setTitles(converted);
      setPagination((prev) => ({ ...prev, total: response.pagination.total }));
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    property && fetch(property);
  }, [property]);

  return { titles, setTitles, pagination, setPagination, fetch };
};

export default getLimitedTitlesByProperty;
