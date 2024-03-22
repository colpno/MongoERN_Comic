import classNames from "classnames/bind";
import styles from "../AddCoin.module.scss";

export const cx = classNames.bind(styles);

function AddCoinQuotes() {
  return (
    <div className={cx("add-coin__step")}>
      <div className={cx("note")}>
        <p className={cx("note__title")}>GHI CHÚ</p>
        <p className={cx("note__content")}>
          Coin được nạp vào hệ thống sẽ được sử dụng trên tất cả các nền tảng bao gồm Website.
          <br />
          Coin sẽ được sử dụng để mua Chương truyện.
          <br />
          Không thể hoàn trả lại tiền sau khi đã mua Coin.
          <br />
          Nếu có lỗi trong việc nạp Coin, xin vui lòng liên hệ{" "}
          <span className={cx("note__content--mark")}>Hỗ trợ.</span>
        </p>
      </div>
    </div>
  );
}

export default AddCoinQuotes;
