import chapterReportApi from "api/chapterReportApi";
import { useEffect, useState } from "react";

const getAllChapterReportsByTitleID = (chapterID) => {
  const [chapterReports, setChapterReports] = useState([]);
  const [year, setYear] = useState({
    current: new Date().getFullYear(),
    minimum: 0,
  });
  const [chartLikeData, setChartLikeData] = useState({});
  const [chartViewData, setChartViewData] = useState({});

  const gatherDataForChartLike = (reports) => {
    let arr = [];
    const temp = reports.reduce((obj, report) => {
      Object.keys(obj).includes(report.year.toString())
        ? arr.push(report.like)
        : (arr = [report.like]);
      return { ...obj, [report.year]: arr };
    }, {});
    setChartLikeData(temp);
  };

  const gatherDataForChartView = (reports) => {
    let arr = [];
    const temp = reports.reduce((obj, report) => {
      Object.keys(obj).includes(report.year.toString())
        ? arr.push(report.view)
        : (arr = [report.view]);
      return { ...obj, [report.year]: arr };
    }, {});
    setChartViewData(temp);
  };

  const calculateMinimumYear = (reports) => {
    const minimum = reports.reduce((acc, cur) => {
      return cur.year < acc ? cur.year : acc;
    }, reports[0].year);
    setYear({ ...year, minimum });
  };

  const fetchLimitChapterReports = async () => {
    try {
      const response = await chapterReportApi.getOneByID(chapterID);
      const converted = {
        ...response,
        like: Number.parseInt(response.like, 10),
        view: Number.parseInt(response.view, 10),
      };
      setChapterReports(converted);
      calculateMinimumYear(response);
      gatherDataForChartLike(response);
      gatherDataForChartView(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitChapterReports();
  }, [chapterID]);

  return {
    chapterReports,
    setChapterReports,
    currentYear: year.current,
    minimumYear: year.minimum,
    chartLikeData,
    chartViewData,
  };
};

export default getAllChapterReportsByTitleID;
