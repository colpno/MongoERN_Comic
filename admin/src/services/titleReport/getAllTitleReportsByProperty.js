import titleReportApi from "api/titleReportApi";
import { useEffect, useState } from "react";

const getAllTitleReportsByProperty = (prop) => {
  const [reports, setReports] = useState([]);

  const fetch = async () => {
    try {
      const response = await titleReportApi.filter(prop);
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

export default getAllTitleReportsByProperty;
