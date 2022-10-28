import incomeReportApi from "api/incomeReportApi";
import { useEffect, useState } from "react";
import { convertIncomeStatPropertyToString } from "utils/convertArrayPropertyToString";

const getAllIncomeReports = () => {
  const [incomeReports, setIncomeReports] = useState([]);
  const [year, setYear] = useState({
    current: new Date().getFullYear(),
    minimum: 0,
  });
  const [incomeChartData, setIncomeChartData] = useState({});
  const [chapterIncome, setChapterIncome] = useState({});
  const [coinRechargeIncome, setCoinRechargeIncome] = useState({});

  const gatherDataForChart = (reports) => {
    let arr = [];
    const temp = reports.reduce((obj, report) => {
      Object.keys(obj).includes(report.year.toString())
        ? arr.push(report.income)
        : (arr = [report.income]);
      return { ...obj, [report.year]: arr };
    }, {});
    setIncomeChartData(temp);
  };

  const gatherChapterIncomeChartData = (reports) => {
    let arr = [];
    const temp = reports.reduce((obj, report) => {
      Object.keys(obj).includes(report.year.toString())
        ? arr.push(report.chapterIncome)
        : (arr = [report.chapterIncome]);
      return { ...obj, [report.year]: arr };
    }, {});
    setChapterIncome(temp);
  };

  const gatherCoinRechargeIncomeChartData = (reports) => {
    let arr = [];
    const temp = reports.reduce((obj, report) => {
      Object.keys(obj).includes(report.year.toString())
        ? arr.push(report.coinRechargeIncome)
        : (arr = [report.coinRechargeIncome]);
      return { ...obj, [report.year]: arr };
    }, {});
    setCoinRechargeIncome(temp);
  };

  const calculateMinimumYear = (reports) => {
    const minimum = reports.reduce((acc, cur) => {
      return cur.year < acc ? cur.year : acc;
    }, reports[0].year);
    setYear({ ...year, minimum });
  };

  const fetchLimitIncomeReports = async () => {
    try {
      const response = await incomeReportApi.getAll();
      const converted = convertIncomeStatPropertyToString(response);
      setIncomeReports(converted);
      calculateMinimumYear(response);
      gatherDataForChart(response);
      gatherChapterIncomeChartData(response);
      gatherCoinRechargeIncomeChartData(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchLimitIncomeReports();
  }, []);

  return {
    incomeReports,
    setIncomeReports,
    currentYear: year.current,
    minimumYear: year.minimum,
    incomeChartData,
    chapterIncome,
    coinRechargeIncome,
  };
};

export default getAllIncomeReports;
