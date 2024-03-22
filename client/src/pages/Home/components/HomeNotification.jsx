import classNames from "classnames/bind";
import { Button, HeadTitleMark } from "components";
import { memo } from "react";
import styles from "../styles/Notification.module.scss";
import HomeNotificationList from "./HomeNotificationList";

const cx = classNames.bind(styles);

function Notification() {
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
        <HomeNotificationList />
      </div>
    </section>
  );
}

export default memo(Notification);
