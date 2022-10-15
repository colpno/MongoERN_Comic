import { FloatingContainer } from "components";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "../styles/AdminCard.module.scss";

const cx = classNames.bind(styles);

function AdminCard({ icon, label, subLabel, amount }) {
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
        <div className={cx("chart-wrapper")} />
      </div>
    </FloatingContainer>
  );
}

AdminCard.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  subLabel: PropTypes.string,
  amount: PropTypes.string.isRequired,
};

AdminCard.defaultProps = {
  subLabel: "adasas",
};

export default AdminCard;
