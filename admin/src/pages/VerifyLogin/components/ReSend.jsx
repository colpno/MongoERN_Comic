import PropTypes from "prop-types";
import classNames from "classnames/bind";

import { Button } from "components";
import styles from "../styles/ReSend.module.scss";

const cx = classNames.bind(styles);

function ReSend({ isDisabled, handleReSend, countdown }) {
  return (
    <div className={cx("resend-code", "text-muted")}>
      Chưa nhận được?
      <Button wrapper disabled={isDisabled} className={cx("btn-resend")} onClick={handleReSend}>
        Gửi lại
      </Button>
      {countdown !== 0 && <div className={cx("countdown")}>{countdown}</div>}
    </div>
  );
}

ReSend.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  handleReSend: PropTypes.func.isRequired,
  countdown: PropTypes.number.isRequired,
};

export default ReSend;
