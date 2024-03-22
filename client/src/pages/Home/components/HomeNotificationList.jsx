import classNames from "classnames/bind";
import { Button } from "components/index.jsx";
import { useGetNotifications } from "hooks/index.jsx";
import { AiOutlineClockCircle } from "react-icons/ai";
import { formatTime } from "utils/convertTime.js";
import styles from "../styles/Notification.module.scss";

const cx = classNames.bind(styles);

function HomeNotificationList() {
  const { data: notifications = [] } = useGetNotifications({
    _sort: {
      updatedAt: -1,
    },
    _limit: 5,
  });

  return (
    <ul>
      {notifications.length > 0 &&
        notifications.map((notification) => {
          const timeObj = formatTime(notification.createdAt);
          return (
            <li key={notification._id}>
              <Button wrapper to={`/notice/${notification._id}`} className={cx("notice")}>
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
  );
}

export default HomeNotificationList;
