/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { AiOutlineClockCircle } from "react-icons/ai";

import Button from "components/Button";
import { formatTime } from "utils/convertTime";
import styles from "../assets/styles/Notification.module.scss";

const cx = classNames.bind(styles);

export default function Notification() {
  // const notices = NoticeArray().slice(0, 3);

  return (
    <section className={cx("notification")}>
      <div className={cx("container")}>
        <header className={cx("head")}>
          <h3 className={cx("title")}>Thong bao</h3>
          <Button text to="/notice-list">
            Xem them
          </Button>
        </header>
        <ul>
          {/* {notices.map((notice) => {
            const timeObj = formatTime(notice.createdAt);
            return (
              <li key={notice.id}>
                <Button wrapper to="/notice/1">
                  <span className={cx("title")}>{notice.title}</span>
                  <span>
                    <AiOutlineClockCircle />
                    <span
                      className={cx("date")}
                    >{`${timeObj.day}.${timeObj.month}.${timeObj.year}`}</span>
                  </span>
                </Button>
              </li>
            );
          })} */}
        </ul>
      </div>
    </section>
  );
}
