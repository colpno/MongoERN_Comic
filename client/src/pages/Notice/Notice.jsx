import { useGetNotificationQuery } from "api/notification.api.js";
import classNames from "classnames/bind";
import DOMPurify from "dompurify";
import { memo } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { formatTime } from "utils/convertTime.js";
import styles from "./Notice.module.scss";

const cx = classNames.bind(styles);

function Notice() {
  const { noticeId } = useParams();
  const { data: notification } = useGetNotificationQuery(noticeId);

  if (!notification) {
    return <div />;
  }

  const postedTime = formatTime(notification.createdAt);

  return (
    <div className={cx("notice-page")}>
      <div className={cx("box-img")}>
        <img src={notification.cover.source} alt={notification.title} />
      </div>
      <div className={cx("notice-page__beginning")}>
        <div className={cx("notice-page__beginning__head")}>
          <h2 className={cx("title")}>{notification.title}</h2>
          <span className={cx("subtitle")}>{notification.subTitle}</span>
        </div>
        <div className={cx("notice-page__beginning__time")}>
          <AiOutlineClockCircle className={cx("clock-icon")} />
          <span
            className={cx("time")}
          >{`${postedTime.day}.${postedTime.month}.${postedTime.year} ${postedTime.hour}:${postedTime.minute}`}</span>
        </div>
      </div>
      <div className={cx("notice-page__middle")}>
        <p
          className={cx("content")}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(notification.content) }}
        />
      </div>
    </div>
  );
}

export default memo(Notice);
