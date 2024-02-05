import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import styles from "./Loading.module.scss";

const cx = classNames.bind(styles);

function Loading() {
  const isLoading = useSelector((state) => state.common.isLoading);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!isLoading) return <></>;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("loader")}>
        <div className={cx("circle")} />
        <div className={cx("circle")} />
        <div className={cx("circle")} />
      </div>
      <div className={cx("background")} />
    </div>
  );
}

export default Loading;
