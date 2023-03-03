import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { Loading } from "features";
import { useToast } from "hooks";
import { readingHistoryService } from "services";
import ReadingHistoryTable from "./components/ReadingHistoryTable";
import styles from "./styles/ReadingHistory.module.scss";

const cx = classNames.bind(styles);

function ReadingHistory() {
  const [loading, setLoading] = useState(false);
  const [histories, setHistories] = useState([]);
  const { Toast, options, toastEmitter } = useToast();

  useEffect(() => {
    setLoading(true);

    const params = {
      _embed: JSON.stringify([
        { collection: "chapter_id", fields: "title" },
        { collection: "title_id", fields: "cover.source title" },
      ]),
      _fields: "-user_id -__v",
    };

    readingHistoryService
      .getAll(params)
      .then((response) => {
        setHistories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        toastEmitter(error, "error");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Container className={cx("reading-history")}>
        <ReadingHistoryTable readingHistories={histories} />
      </Container>
      {loading && <Loading />}
      <Toast {...options} />
    </>
  );
}

export default ReadingHistory;
