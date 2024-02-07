import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";

import { FloatingContainer } from "components";
import { DoughnutChart } from "features";
import styles from "./StatisticCard.module.scss";

const cx = classNames.bind(styles);

function StatisticCard({ icon, label, amount, subLabel, chartProps }) {
  return (
    <FloatingContainer className={cx("container")}>
      <div className={cx("text")}>
        <div className={cx("icon")}>
          <img src={icon} alt={label} />
        </div>
        <div className={cx("text-wrapper")}>
          <p className={cx("label")}>{label}</p>
          <p className={cx("amount")}>{amount}</p>
          <p className={cx("sub-label")}>{subLabel}</p>
        </div>
      </div>
      <div className={cx("chart")}>
        <DoughnutChart width="160px" height="160px" {...chartProps} legend={{ display: false }} />
      </div>
    </FloatingContainer>
  );
}

StatisticCard.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  subLabel: PropTypes.string,
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  chartProps: PropTypes.shape({}).isRequired,
};

StatisticCard.defaultProps = {
  icon: undefined,
  subLabel: undefined,
};

export default memo(StatisticCard);
