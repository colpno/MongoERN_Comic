import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { useToast } from "hooks";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useDispatch } from "react-redux";
import { readingHistoryService } from "services";
import ReadingHistoryTable from "./components/ReadingHistoryTable";
import styles from "./styles/ReadingHistory.module.scss";

const cx = classNames.bind(styles);

function ReadingHistory() {
  const dispatch = useDispatch();
  const [histories, setHistories] = useState([]);
  const { Toast, options, toastEmitter } = useToast();

  useEffect(() => {
    dispatch(setLoading(true));

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
      })
      .catch((error) => {
        toastEmitter(error, "error");
      });

    dispatch(setLoading(false));
  }, []);

  return (
    <>
      <Container className={cx("reading-history")}>
        <ReadingHistoryTable readingHistories={histories} />
      </Container>
      <Toast {...options} />
    </>
  );
}

export default ReadingHistory;
