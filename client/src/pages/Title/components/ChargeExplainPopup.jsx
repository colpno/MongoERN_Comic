import classNames from "classnames/bind";
import { BsFillLightningFill } from "react-icons/bs";

import styles from "../styles/ChargeExplainPopup.module.scss";

const cx = classNames.bind(styles);

function ChargeExplainPopup() {
  return (
    <div className={cx("popup-charge-explain")}>
      <div className={cx("charging-demo")}>
        <div className={cx("charge-bar")}>
          <span>10:12:31</span>
        </div>
        <span>Thanh đang sạc</span>
      </div>
      <div className={cx("fully-charge-demo")}>
        <div className={cx("charge-bar")}>
          <span>Sạc đầy</span>
        </div>
        <span>Thanh sạc đầy</span>
      </div>
      <div className={cx("text-box")}>
        <p>
          <BsFillLightningFill />
          Bạn có thể đọc miễn phí một chương có {`"Vé thuê"`} khi thanh sạc đầy.
        </p>
        <p>
          <BsFillLightningFill />
          Sau khi sử dụng, thanh tiến trình sẽ mất hiệu lực và bắt đầu sạc lại
          từ đầu. Thanh tiến trình chỉ được sạc lại sau khi bạn đã sử dụng.
        </p>
        <p>
          <BsFillLightningFill />
          Bạn có thể theo dõi thời gian sạc lại thanh tiến trình và tiếp tục
          chọn chương để đọc miễn phí sau khi thanh đầy lại.
        </p>
      </div>
    </div>
  );
}

export default ChargeExplainPopup;
