import classNames from "classnames/bind";
import { Button } from "components";
import { useSendOTP } from "hooks";
import useCountdown from "hooks/useCountdown.jsx";
import PropTypes from "prop-types";
import { memo } from "react";
import styles from "../styles/ReSend.module.scss";

const cx = classNames.bind(styles);

function ReSend({ loginInfo }) {
  const { sendOTP } = useSendOTP();
  const { countdownTime, isExpired, startCountdown } = useCountdown({
    initialTime: 5000,
    format: "s",
  });
  const canReSend = isExpired || !countdownTime;

  const handleReSend = () => {
    const { id, username, email } = loginInfo;
    sendOTP({ id, username, email });
    startCountdown();
  };

  return (
    <div className={cx("resend-code", "text-muted")}>
      Chưa nhận được?
      <Button
        wrapper
        disabled={!canReSend}
        className={cx("btn-resend")}
        onClick={() => handleReSend()}
      >
        Gửi lại
      </Button>
      {!canReSend && <div className={cx("countdown")}>{countdownTime}</div>}
    </div>
  );
}

ReSend.propTypes = {
  loginInfo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default memo(ReSend);
