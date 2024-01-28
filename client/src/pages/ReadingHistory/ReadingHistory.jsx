import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { setLoading } from "libs/redux/slices/common.slice.js";
import { useDispatch } from "react-redux";
import { readingHistoryService } from "services";
import ReadingHistoryTable from "./components/ReadingHistoryTable";
import styles from "./styles/ReadingHistory.module.scss";

const cx = classNames.bind(styles);

function ReadingHistory() {
  const dispatch = useDispatch();
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    dispatch(setLoading(true));

    const params = {
      _embed: JSON.stringify([
        { collection: "chapter_id", fields: "title" },
        { collection: "title_id", fields: "cover.source title" },
      ]),
      _fields: "-user_id -__v",
    };

    readingHistoryService.getAll(params).then((response) => {
      setHistories(response.data);
    });

    dispatch(setLoading(false));
  }, []);

  return (
    <Container className={cx("reading-history")}>
      <ReadingHistoryTable readingHistories={histories} />
    </Container>
  );
}

export default ReadingHistory;
