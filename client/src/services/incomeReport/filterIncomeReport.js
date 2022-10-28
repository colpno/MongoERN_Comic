import incomeReportApi from "api/incomeReportApi";
import { useEffect, useState } from "react";
import { convertIncomeStatPropertyToString } from "utils/convertArrayPropertyToString";

const filterIncomeReport = (filterObj) => {
  const [incomeReports, setIncomeReports] = useState([]);
  const [properties, setProperties] = useState(filterObj);

  const changeFilter = ({ newProperties }) => {
    const changedFilter = { ...properties, ...newProperties };
    setProperties(changedFilter);
  };

  const fetchLimitIncomeReports = async () => {
    try {
      const response = await incomeReportApi.filter(properties);
      const converted = convertIncomeStatPropertyToString(response);
      setIncomeReports(converted);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitIncomeReports();
  }, [properties]);

  return {
    incomeReports,
    setIncomeReports,
    changeFilter,
  };
};

export default filterIncomeReport;
