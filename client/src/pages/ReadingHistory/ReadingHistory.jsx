import classNames from "classnames/bind";
import { Container } from "react-bootstrap";

import { useGetReadingHistories } from "hooks/index.jsx";
import ReadingHistoryTable from "./components/ReadingHistoryTable";
import styles from "./styles/ReadingHistory.module.scss";

const cx = classNames.bind(styles);

function ReadingHistory() {
  const { data: histories = [] } = useGetReadingHistories({
    _embed: JSON.stringify([
      { collection: "chapter_id", fields: "title order" },
      { collection: "title_id", fields: "cover.source title" },
    ]),
    _fields: "-user_id -__v",
  });

  return (
    <Container className={cx("reading-history")}>
      <ReadingHistoryTable readingHistories={histories} />
    </Container>
  );
}

export default ReadingHistory;
