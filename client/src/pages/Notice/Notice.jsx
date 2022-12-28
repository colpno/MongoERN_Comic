/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { AiOutlineClockCircle } from "react-icons/ai";
import { formatTime } from "utils/convertTime";
import styles from "./Notice.module.scss";

const cx = classNames.bind(styles);

function Notice() {
  // const notice = NoticeArray()[0];
  // const postedTime = formatTime(notice.createdAt);

  return (
    <div className={cx("notice-page")}>
      {/* <div className={cx("box-img")}>
        <img src={notice.cover} alt={notice.title} />
      </div>
      <div className={cx("notice-page__beginning")}>
        <div className={cx("notice-page__beginning__head")}>
          <h2 className={cx("title")}>{notice.title}</h2>
          <span className={cx("subtitle")}>{notice.subTitle}</span>
        </div>
        <div className={cx("notice-page__beginning__time")}>
          <AiOutlineClockCircle className={cx("clock-icon")} />
          <span
            className={cx("time")}
          >{`${postedTime.day}.${postedTime.month}.${postedTime.year} ${postedTime.hour}:${postedTime.minute}`}</span>
        </div>
      </div>
      <div className={cx("notice-page__middle")}>
        <p className={cx("content")}>{notice.content}</p>
      </div> */}
    </div>
  );
}

export default Notice;
