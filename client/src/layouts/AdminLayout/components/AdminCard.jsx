import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";

import { FloatingContainer } from "components";
import DoughnutChart from "components/DoughnutChart/DoughnutChart";
import styles from "../styles/AdminCard.module.scss";

const cx = classNames.bind(styles);

function AdminCard({ rawData, chartProps }) {
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
        <DoughnutChart width="100px" height="100px" {...chartProps} />
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
  chartProps: PropTypes.shape({}).isRequired,
};

export default memo(AdminCard);
