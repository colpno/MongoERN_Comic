import titleReportApi from "api/titleReportApi";
import { useEffect, useState } from "react";

const getAllTitleReportsByProperty = (properties) => {
  const [reports, setReports] = useState([]);

  const fetch = async (props) => {
    try {
      const response = await titleReportApi.filter(props);
      setReports(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    properties && fetch(properties);
  }, []);

  return { reports, setReports, fetchAllTitlesByProperty: fetch };
};

export default getAllTitleReportsByProperty;
