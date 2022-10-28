import titleReportApi from "api/titleReportApi";
import { useEffect, useState } from "react";
import { convertTitleStatPropertyToString } from "utils/convertArrayPropertyToString";

const filterTitleReport = (filterObj) => {
  const [titleReports, setTitleReports] = useState([]);
  const [properties, setProperties] = useState(filterObj);

  const changeFilter = ({ newProperties }) => {
    const changedFilter = { ...properties, ...newProperties };
    setProperties(changedFilter);
  };

  const fetchLimitTitleReports = async () => {
    try {
      const response = await titleReportApi.filter(properties);
      const converted = convertTitleStatPropertyToString(response);
      setTitleReports(converted);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitTitleReports();
  }, [properties]);

  return {
    titleReports,
    setTitleReports,
    changeFilter,
  };
};

export default filterTitleReport;
