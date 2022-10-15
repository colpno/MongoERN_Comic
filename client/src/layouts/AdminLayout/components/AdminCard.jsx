import { ArcElement, Chart, Tooltip } from "chart.js";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";
import { Doughnut } from "react-chartjs-2";

import { FloatingContainer } from "components";
import styles from "../styles/AdminCard.module.scss";

const cx = classNames.bind(styles);
Chart.register(ArcElement, Tooltip);

function AdminCard({ rawData, chartData }) {
  const { icon, label, amount, subLabel } = rawData;

  return (
    <FloatingContainer>
      <div className={cx("icon")}>
        <img src={icon} alt={label} />
      </div>
      <div className={cx("content")}>
        <div className={cx("text-wrapper")}>
          <p className={cx("label")}>{label}</p>
          <p className={cx("amount")}>{amount}</p>
          <p className={cx("sub-label")}>{subLabel}</p>
        </div>
        <div className={cx("chart-wrapper")}>
          {/* {console.log(chartData)} */}
          <Doughnut {...chartData} />
        </div>
      </div>
    </FloatingContainer>
  );
}

AdminCard.propTypes = {
  rawData: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    subLabel: PropTypes.string,
    amount: PropTypes.number.isRequired,
  }).isRequired,
  chartData: PropTypes.shape({
    data: PropTypes.shape({
      labels: PropTypes.arrayOf(PropTypes.string.isRequired),
      datasets: PropTypes.arrayOf(
        PropTypes.shape({
          data: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
          backgroundColor: PropTypes.arrayOf(PropTypes.string.isRequired)
            .isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default memo(AdminCard);
