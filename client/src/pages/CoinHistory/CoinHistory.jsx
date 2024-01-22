import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { useToast } from "hooks";
import { transactionService } from "services";
import CoinHistoryTable from "./components/CoinHistoryTable";
import styles from "./styles/CoinHistory.module.scss";

const cx = classNames.bind(styles);

function CoinHistory() {
  const [histories, setHistories] = useState([]);
  const { Toast, options, toastEmitter } = useToast();

  useEffect(() => {
    transactionService
      .getAll()
      .then((response) => {
        setHistories(response.data);
      })
      .catch((error) => toastEmitter(error, "error"));
  }, []);

  return (
    <>
      <Container className={cx("coin-history")}>
        <CoinHistoryTable histories={histories} />
      </Container>
      <Toast {...options} />
    </>
  );
}

export default CoinHistory;
