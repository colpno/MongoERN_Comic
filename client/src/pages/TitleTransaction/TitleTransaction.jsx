import classNames from "classnames/bind";
import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

import { TabsContainer } from "components";
import HiredChapters from "./pages/HiredChapters";
import PurchasedChapters from "./pages/PurchasedChapters";
import styles from "./styles/TitleTransaction.module.scss";

const cx = classNames.bind(styles);

function TitleTransaction() {
  const [searchParams] = useSearchParams();
  const queryTab = searchParams.get("tab") || "";
  const menu = [
    { label: "Đã mua", tab: "purchased-titles", href: "?tab=purchased-titles" },
    { label: "Đã thuê", tab: "hired-titles", href: "?tab=hired-titles" },
  ];

  return (
    <Container className={cx("transaction")}>
      <TabsContainer menu={menu} />
      {queryTab === menu[0].tab && <PurchasedChapters cx={cx} />}
      {queryTab === menu[1].tab && <HiredChapters cx={cx} />}
    </Container>
  );
}

export default TitleTransaction;
