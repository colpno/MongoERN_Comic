import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsChevronRight } from "react-icons/bs";

import { Button, FloatingContainer, Select } from "components";
import { getLimitedCoinHistories } from "services/coinHistory";
import { getAllIncomeReports } from "services/incomeReport";
import { getAllPayMethods } from "services/payMethod";
import { getLimitedPurchasedChapters } from "services/purchasedChapter";
import { createArrayFromTo } from "utils";
import { getChartColors, getMonthArray } from "utils/constants";
import ChapterIncomeStat from "./components/ChapterIncomeStat";
import CoinRechargeStat from "./components/CoinRechargeStat";
import IncomeChart from "./components/IncomeChart";
import PaymentMethodsStat from "./components/PaymentMethodsStat";
import RecentCoinTransactions from "./components/RecentCoinTransactions";
import RecentPurchasedChapters from "./components/RecentPurchasedChapters";
import styles from "./styles/IncomeStatistic.module.scss";

const cx = classNames.bind(styles);

function IncomeStatistic() {
  const { coinHistories } = getLimitedCoinHistories(6);
  const { purchasedChapters } = getLimitedPurchasedChapters(6);

  /* 
    Statistic the number of pay method was used
   */
  const { payMethods } = getAllPayMethods();
  const popularPayMethodsStatisticData = { data: [], labels: [] };

  const calculateDataForStatistic = () => {
    const popularPayMethods = {};
    payMethods.forEach((payMethod) => {
      popularPayMethods[payMethod.id] = { times: 0, system: payMethod.system };
    });
    coinHistories.forEach((coinHistory) => {
      popularPayMethods[coinHistory.payMethodId].times += 1;
    });
    Object.keys(popularPayMethods).forEach((payMethodId) => {
      popularPayMethodsStatisticData.data.push(
        popularPayMethods[payMethodId].times
      );
      popularPayMethodsStatisticData.labels.push(
        popularPayMethods[payMethodId].system
      );
    });
  };

  coinHistories.length > 0 &&
    payMethods.length > 0 &&
    calculateDataForStatistic();

  // Income Stat
  const monthArray = getMonthArray();
  const { backgroundColors, borderColors } = getChartColors();

  const {
    minimumYear,
    currentYear,
    incomeChartData,
    chapterIncome,
    coinRechargeIncome,
  } = getAllIncomeReports();
  const selectOptions = createArrayFromTo(minimumYear, currentYear)
    .reverse()
    .map((year) => {
      return { value: `${year}`, label: `${year}` };
    });
  const [incomeStatDataSet, setIncomeStatDataSet] = useState([
    {
      label: `Tổng thu nhập năm ${currentYear}`,
      data: [0],
      backgroundColor: backgroundColors[0],
      borderColor: borderColors[0],
    },
  ]);
  const [chapterIncomeStatDataSet, setChapterIncomeStatDataSet] = useState([
    {
      label: `Thu nhập từ mua chương năm ${currentYear}`,
      data: [0],
      backgroundColor: backgroundColors[2],
      borderColor: borderColors[2],
    },
  ]);
  const [coinRechargeIncomeStatDataSet, setCoinRechargeIncomeStatDataSet] =
    useState([
      {
        label: `Thu nhập từ nạp năm ${currentYear}`,
        data: [0],
        backgroundColor: backgroundColors[1],
        borderColor: borderColors[1],
      },
    ]);

  const handleYearChange = (selectedOption) => {
    let datasets = [];
    selectedOption.forEach((option, index) => {
      const year = Number.parseInt(option.value, 10);
      datasets.push({
        label: `Tổng thu nhập năm ${year}`,
        data: incomeChartData[year],
        backgroundColor: [backgroundColors[index]],
        borderColor: [borderColors[index]],
      });
    });
    setIncomeStatDataSet(datasets);

    datasets = [];
    selectedOption.forEach((option, index) => {
      const year = Number.parseInt(option.value, 10);
      datasets.push({
        label: `Thu nhập từ mua chương năm ${year}`,
        data: chapterIncome[year],
        backgroundColor: [backgroundColors[index]],
        borderColor: [borderColors[index]],
      });
    });
    setChapterIncomeStatDataSet(datasets);

    datasets = [];
    selectedOption.forEach((option, index) => {
      const year = Number.parseInt(option.value, 10);
      datasets.push({
        label: `Thu nhập từ nạp năm ${year}`,
        data: coinRechargeIncome[year],
        backgroundColor: [backgroundColors[index]],
        borderColor: [borderColors[index]],
      });
    });
    setCoinRechargeIncomeStatDataSet(datasets);
  };

  useEffect(() => {
    setIncomeStatDataSet([
      { ...incomeStatDataSet[0], data: incomeChartData[currentYear] },
    ]);
  }, [incomeChartData]);

  useEffect(() => {
    setChapterIncomeStatDataSet([
      { ...chapterIncomeStatDataSet[0], data: chapterIncome[currentYear] },
    ]);
  }, [chapterIncome]);

  useEffect(() => {
    setCoinRechargeIncomeStatDataSet([
      {
        ...coinRechargeIncomeStatDataSet[0],
        data: coinRechargeIncome[currentYear],
      },
    ]);
  }, [coinRechargeIncome]);

  // income source: nap, mua chapter (20 coin = 20K VND)

  // most sale title's chapters
  // Thu nhap cua tat ca nguoi dang truyen qua tung thang
  // bieu do thu nhap 3 nguoi cao nhat

  return (
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
              <CoinRechargeStat
                labels={monthArray}
                datasets={chapterIncomeStatDataSet}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <ChapterIncomeStat
                labels={monthArray}
                datasets={coinRechargeIncomeStatDataSet}
              />
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
            <RecentPurchasedChapters
              cx={cx}
              purchasedChapters={purchasedChapters}
            />
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
  );
}

export default IncomeStatistic;
