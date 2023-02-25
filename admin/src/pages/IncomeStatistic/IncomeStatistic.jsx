/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsChevronRight } from "react-icons/bs";

import { Button, FloatingContainer, Select } from "components";
import { useToast } from "hooks";
import {
  chapterTransactionService,
  coinHistoryService,
  incomeService,
  paymentMethodService,
} from "services";
import { createArrayFromTo, handlePromiseAllSettled } from "utils";
import { getChartColors, getMonthArray } from "utils/constants";
import {
  ChapterIncomeStat,
  CoinRechargeStat,
  IncomeChart,
  PaymentMethodsStat,
  RecentCoinTransactions,
  RecentPurchasedChapters,
} from "./components";
import styles from "./styles/IncomeStatistic.module.scss";

const cx = classNames.bind(styles);

function IncomeStatistic() {
  const [data, setData] = useState({
    coinHistories: [],
    purchasedChapters: [],
    paymentMethods: [],
    incomeReports: [],
  });
  const { coinHistories, purchasedChapters, paymentMethods, incomeReports } = data;
  const currentYear = useMemo(() => moment().year(), []);
  // const [year, setYear] = useState({ minimum: currentYear, current: currentYear });

  // const { incomeChartData, chapterIncome, coinRechargeIncome } = getAllIncomeReports();
  const { Toast, options, toastEmitter } = useToast();

  const getInitChartData = (length = 12, value = 0) => Array(length).fill(value);

  const gatherDataByYear = (array = [], fieldContainValue = "") => {
    return array.reduce((result, item) => {
      result[item.year] = result[item.year]
        ? result[item.year] + item[fieldContainValue]
        : item[fieldContainValue];
      return result;
    }, {});
  };

  useEffect(() => {
    const params = { _limit: 6 };
    const purchasedChapterParams = {
      ...params,
      _embed: JSON.stringify([
        { collection: "user_id", fields: "username" },
        { collection: "title_id", fields: "title" },
        { collection: "chapter_id", fields: "title" },
      ]),
      method: "coin",
    };

    const coinHistoryPromise = coinHistoryService.getAll(params);
    const purchasedChapterPromise = chapterTransactionService.getAll(params);
    const paymentMethodPromise = paymentMethodService.getAll();
    const incomeReportPromise = incomeService.getAll();
    const promises = [
      coinHistoryPromise,
      purchasedChapterPromise,
      paymentMethodPromise,
      incomeReportPromise,
    ];

    const results = Promise.allSettled(promises);
    const { fulfilledResults } = handlePromiseAllSettled(results, toastEmitter);
    const [coinHistoryResult, purchasedChapterResult, paymentMethodResult, incomeReportResult] =
      fulfilledResults;

    setData({
      coinHistories: coinHistoryResult.data,
      purchasedChapters: purchasedChapterResult.data,
      paymentMethods: paymentMethodResult.data,
      incomeReports: incomeReportResult.data,
    });
  }, []);

  /* 
    Statistic the number of pay method was used
   */
  const popularPayMethodsStatisticData = { data: [], labels: [] };

  const calculateDataForStatistic = () => {
    const popularPayMethods = {};
    paymentMethods.forEach((payMethod) => {
      popularPayMethods[payMethod.id] = { times: 0, system: payMethod.system };
    });
    coinHistories.forEach((coinHistory) => {
      popularPayMethods[coinHistory.payMethodId].times += 1;
    });
    Object.keys(popularPayMethods).forEach((payMethodId) => {
      popularPayMethodsStatisticData.data.push(popularPayMethods[payMethodId].times);
      popularPayMethodsStatisticData.labels.push(popularPayMethods[payMethodId].system);
    });
  };

  coinHistories.length > 0 && paymentMethods.length > 0 && calculateDataForStatistic();

  // Income Stat
  const monthArray = getMonthArray();
  const { backgroundColors, borderColors } = getChartColors();
  const incomeMinYear = useMemo(() =>
    incomeReports.data.reduce((oldestIncome, income) => {
      return oldestIncome.year < income.year ? income : oldestIncome;
    })
  );

  const selectOptions = createArrayFromTo(incomeMinYear, currentYear)
    .reverse()
    .map((year) => {
      return { value: `${year}`, label: `${year}` };
    });
  const [incomeStatDataSet, setIncomeStatDataSet] = useState([
    {
      label: `Tổng thu nhập năm ${currentYear}`,
      data: getInitChartData(),
      backgroundColor: backgroundColors[0],
      borderColor: borderColors[0],
    },
  ]);
  const [chapterIncomeStatDataSet, setChapterIncomeStatDataSet] = useState([
    {
      label: `Thu nhập từ mua chương năm ${currentYear}`,
      data: getInitChartData(),
      backgroundColor: backgroundColors[2],
      borderColor: borderColors[2],
    },
  ]);
  const [coinRechargeIncomeStatDataSet, setCoinRechargeIncomeStatDataSet] = useState([
    {
      label: `Thu nhập từ nạp năm ${currentYear}`,
      data: getInitChartData(),
      backgroundColor: backgroundColors[1],
      borderColor: borderColors[1],
    },
  ]);

  const handleYearChange = (selectedOption) => {
    // let datasets = [];
    // selectedOption.forEach((option, index) => {
    //   const year = Number.parseInt(option.value, 10);
    //   datasets.push({
    //     label: `Tổng thu nhập năm ${year}`,
    //     data: incomeChartData[year],
    //     backgroundColor: [backgroundColors[index]],
    //     borderColor: [borderColors[index]],
    //   });
    // });
    // setIncomeStatDataSet(datasets);
    // datasets = [];
    // selectedOption.forEach((option, index) => {
    //   const year = Number.parseInt(option.value, 10);
    //   datasets.push({
    //     label: `Thu nhập từ mua chương năm ${year}`,
    //     data: chapterIncome[year],
    //     backgroundColor: [backgroundColors[index]],
    //     borderColor: [borderColors[index]],
    //   });
    // });
    // setChapterIncomeStatDataSet(datasets);
    // datasets = [];
    // selectedOption.forEach((option, index) => {
    //   const year = Number.parseInt(option.value, 10);
    //   datasets.push({
    //     label: `Thu nhập từ nạp năm ${year}`,
    //     data: coinRechargeIncome[year],
    //     backgroundColor: [backgroundColors[index]],
    //     borderColor: [borderColors[index]],
    //   });
    // });
    // setCoinRechargeIncomeStatDataSet(datasets);
  };

  // useEffect(() => {
  //   setIncomeStatDataSet([{ ...incomeStatDataSet[0], data: incomeChartData[currentYear] }]);
  // }, [incomeChartData]);

  // useEffect(() => {
  //   setChapterIncomeStatDataSet([
  //     { ...chapterIncomeStatDataSet[0], data: chapterIncome[currentYear] },
  //   ]);
  // }, [chapterIncome]);

  // useEffect(() => {
  //   setCoinRechargeIncomeStatDataSet([
  //     {
  //       ...coinRechargeIncomeStatDataSet[0],
  //       data: coinRechargeIncome[currentYear],
  //     },
  //   ]);
  // }, [coinRechargeIncome]);

  // income source: nap, mua chapter (20 coin = 20K VND)

  // most sale title's chapters
  // Thu nhap cua tat ca nguoi dang truyen qua tung thang
  // bieu do thu nhap 3 nguoi cao nhat

  return (
    <>
      <Container>
        <Row>
          <Col md={8}>
            <Row>
              <Col className={cx("income-title")}>
                <h5>Income</h5>
              </Col>
              <Col sm="auto" className={cx("select-wrapper")}>
                <Select
                  options={selectOptions}
                  onChange={handleYearChange}
                  multi
                  clearable
                  limitSelected={2}
                />
              </Col>
            </Row>
            <IncomeChart labels={monthArray} datasets={incomeStatDataSet} />
          </Col>
          <Col md={4}>
            <Row>
              <Col>
                <CoinRechargeStat labels={monthArray} datasets={chapterIncomeStatDataSet} />
              </Col>
            </Row>
            <Row>
              <Col>
                <ChapterIncomeStat labels={monthArray} datasets={coinRechargeIncomeStatDataSet} />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <div className={cx("label-container")}>
              <h5>Recent purchased chapters</h5>
              <Button text to="/admin/coin-transactions" className={cx("more")}>
                more
                <BsChevronRight />
              </Button>
            </div>
            <FloatingContainer>
              <RecentPurchasedChapters cx={cx} purchasedChapters={purchasedChapters} />
            </FloatingContainer>
          </Col>
          <Col md={4}>
            <div className={cx("label-container")}>
              <h5>Recent coin transactions</h5>
              <Button text to="/admin/coin-transactions" className={cx("more")}>
                more
                <BsChevronRight />
              </Button>
            </div>
            <FloatingContainer>
              <RecentCoinTransactions cx={cx} transactions={coinHistories} />
            </FloatingContainer>
          </Col>
          <Col md={4}>
            <PaymentMethodsStat
              labels={popularPayMethodsStatisticData.labels}
              datasets={[
                {
                  label: "Số lần phương thức nạp được sử dụng",
                  data: popularPayMethodsStatisticData.data,
                  backgroundColor: ["#20c997"],
                },
              ]}
            />
          </Col>
        </Row>
      </Container>
      <Toast {...options} />
    </>
  );
}

export default IncomeStatistic;
