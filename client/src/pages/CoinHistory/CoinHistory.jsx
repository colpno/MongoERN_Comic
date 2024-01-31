import classNames from "classnames/bind";
import { Container } from "react-bootstrap";

import { useGetTransactions } from "hooks/index.jsx";
import CoinHistoryTable from "./components/CoinHistoryTable";
import styles from "./styles/CoinHistory.module.scss";

const cx = classNames.bind(styles);

function CoinHistory() {
  const { data: transactions = [] } = useGetTransactions();

  return (
    <Container className={cx("coin-history")}>
      <CoinHistoryTable histories={transactions} />
    </Container>
  );
}

export default CoinHistory;
