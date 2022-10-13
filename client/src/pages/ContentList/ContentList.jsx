import classNames from "classnames/bind";
import CardList from "components/CardList";
import { TitleArray } from "database";
import styles from "./assets/styles/_index.module.scss";

const cx = classNames.bind(styles);

function ContentList() {
  const thirtyItems = TitleArray();

  return (
    <div className={cx("content-list-page")}>
      <CardList data={thirtyItems} col={{ lg: 3 }} />
    </div>
  );
}

export default ContentList;
