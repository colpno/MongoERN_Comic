import chapterReportApi from "api/chapterReportApi";
import { useEffect, useState } from "react";
import { convertTitleStatPropertyToString } from "utils/convertArrayPropertyToString";

const filterChapterReport = (filterObj) => {
  const [chapterReports, setChapterReports] = useState([]);
  const [properties, setProperties] = useState(filterObj);

  const changeFilter = ({ newProperties }) => {
    const changedFilter = { ...properties, ...newProperties };
    setProperties(changedFilter);
  };

  const fetchLimitChapterReports = async () => {
    try {
      const response = await chapterReportApi.filter(properties);
      const converted = convertTitleStatPropertyToString(response);
      setChapterReports(converted);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitChapterReports();
  }, [properties]);

  return {
    chapterReports,
    setChapterReports,
    changeFilter,
  };
};

export default filterChapterReport;
