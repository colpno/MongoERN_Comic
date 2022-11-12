import incomeReportApi from "api/incomeReportApi";
import { useEffect, useState } from "react";

const getAllIncomeReports = () => {
  const [reports, setReports] = useState([]);

  const fetch = async () => {
    try {
      const response = await incomeReportApi.getAll();
      setReports(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { reports, setReports };
};

export default getAllIncomeReports;
