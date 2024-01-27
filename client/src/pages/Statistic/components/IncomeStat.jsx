import classNames from "classnames/bind";
import moment from "moment";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { getChartColors, getMonthArray } from "utils/constants";
import getYearOptions from "utils/getYearOptions";
import IncomeChart from "./IncomeChart";
import styles from "../styles/Statistic.module.scss";

const cx = classNames.bind(styles);

// eslint-disable-next-line no-unused-vars
function IncomeStat({ toastEmitter }) {
  // INFO: Data variables

  const yearOptions = getYearOptions();

  const [reportYear, setReportYear] = useState(yearOptions[0]);

  // INFO: Select controls

  // set title report year every time change chapter report year
  const changeReportYear = (option) => {
    setReportYear(option);
  };

  // INFO: Chart variables

  const months = getMonthArray();
  const arrayOfZero = useMemo(() => new Array(months.length).fill(0), []);
  const currentMonth = useMemo(() => moment().month() + 1, []);
  const { backgroundColors, borderColors } = getChartColors();

  // eslint-disable-next-line no-unused-vars
  const [chartData, setChartData] = useState({
    income: [...arrayOfZero],
  });

  const chartLabels = useMemo(
    () =>
      months.map((month) => {
        if (month.number === currentMonth) return `Tháng hiện tại (${currentMonth})`;
        return `Tháng ${month.number}`;
      }),
    []
  );

  return (
    <Container className={cx("wrapper")}>
      <Row>
        <Col>
          <IncomeChart
            cx={cx}
            yearOptions={yearOptions}
            selectedYear={reportYear}
            changeYear={changeReportYear}
            chartLabels={chartLabels}
            chartData={chartData.income}
            backgroundColors={backgroundColors}
            borderColors={borderColors}
          />
        </Col>
      </Row>
    </Container>
  );
}

IncomeStat.propTypes = {
  toastEmitter: PropTypes.func.isRequired,
};

export default IncomeStat;
