import classNames from "classnames/bind";
import PropTypes from "prop-types";

import { countdown } from "utils/convertTime";
import styles from "../styles/ChargeBar.module.scss";

const cx = classNames.bind(styles);

function ChargeBar({ user }) {
  const now = new Date();
  const endTime = new Date(user.endCountdown);
  const startTime = new Date(user.startCountdown);
  const remainingTime = countdown(endTime - now);
  const isCharging = endTime > now;

  const chargeBarWidth = isCharging
    ? ((now - startTime) / (endTime - startTime)) * 100
    : 100;

  return (
    <div className={cx("charge-bar")}>
      {isCharging ? (
        <div
          className={cx("charging")}
          style={{
            width: `${chargeBarWidth}%`,
          }}
        >
          <span>
            {`${
              remainingTime.hour < 10
                ? `0${remainingTime.hour}`
                : remainingTime.hour
            }:
                  ${
                    remainingTime.minute < 10
                      ? `0${remainingTime.minute}`
                      : remainingTime.minute
                  }:
                  ${
                    remainingTime.second < 10
                      ? `0${remainingTime.second}`
                      : remainingTime.second
                  }`}
          </span>
        </div>
      ) : (
        <div className={cx("fully-charged")}>
          <span>Sạc đầy</span>
        </div>
      )}
    </div>
  );
}
ChargeBar.propTypes = {
  user: PropTypes.shape({
    startCountdown: PropTypes.string.isRequired,
    endCountdown: PropTypes.string.isRequired,
  }).isRequired,
};
export default ChargeBar;
