import classNames from "classnames/bind";
import { memo } from "react";

import { useGetAllNotificationsQuery } from "api/notification.api.js";
import { Button, HeadTitleMark } from "components";
import { AiOutlineClockCircle } from "react-icons/ai";
import { formatTime } from "utils/convertTime.js";
import styles from "../styles/Notification.module.scss";

const cx = classNames.bind(styles);

function Notification() {
  const params = {
    _sort: "updatedAt",
    _order: -1,
    _limit: 5,
  };
  const { data: notifications } = useGetAllNotificationsQuery(params);

  return (
    <section className={cx("notification")}>
      <div className={cx("container")}>
        <HeadTitleMark>
          <header className={cx("head")}>
            <h3 className={cx("title")}>Thông báo</h3>
            <Button text to="/notice-list">
              Xem thêm
            </Button>
          </header>
        </HeadTitleMark>
        <ul>
          {notifications?.length > 0 &&
            notifications.map((notification) => {
              const timeObj = formatTime(notification.createdAt);
              return (
                <li key={notification._id}>
                  <Button wrapper to={`/notice/${notification._id}`}>
                    <span className={cx("title")}>{notification.title}</span>
                    <span>
                      <AiOutlineClockCircle />
                      <span
                        className={cx("date")}
                      >{`${timeObj.day}.${timeObj.month}.${timeObj.year}`}</span>
                    </span>
                  </Button>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
}

export default memo(Notification);
