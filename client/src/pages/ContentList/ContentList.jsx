import classNames from "classnames/bind";
import { useParams } from "react-router-dom";

import CardList from "components/CardList";
import getAllTitlesByGenreID from "services/title/getAllTitlesByGenreID";
import styles from "./assets/styles/_index.module.scss";

const cx = classNames.bind(styles);

function ContentList() {
  const { genreId } = useParams();
  const { titles } = getAllTitlesByGenreID(genreId);

  return (
    <div className={cx("content-list-page")}>
      <CardList data={titles} col={{ lg: 3 }} />
    </div>
  );
}

export default ContentList;
