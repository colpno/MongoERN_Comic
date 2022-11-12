import chapterReportApi from "api/chapterReportApi";
import { useEffect, useState } from "react";

const getAllChapterReportsByProperty = (prop) => {
  const [reports, setReports] = useState([]);

  const fetch = async () => {
    try {
      const response = await chapterReportApi.filter(prop);
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

export default getAllChapterReportsByProperty;
