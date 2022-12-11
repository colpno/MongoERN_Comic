import chapterReportApi from "api/chapterReportApi";
import { useEffect, useState } from "react";

const getAllChapterReportsByProperty = (properties) => {
  const [reports, setReports] = useState([]);

  const fetchAllChapterReportsByProperty = async (props) => {
    try {
      const response = await chapterReportApi.filter(props);
      setReports(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    properties && fetchAllChapterReportsByProperty(properties);
  }, []);

  return { reports, setReports, fetchAllChapterReportsByProperty };
};

export default getAllChapterReportsByProperty;
