import classNames from "classnames/bind";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

import TabsContainer from "components/TabsContainer";
import HiredTitles from "./pages/HiredTitles";
import PurchasedTitles from "./pages/PurchasedTitles";
import styles from "./styles/TitleTransaction.module.scss";

const cx = classNames.bind(styles);

function TitleTransaction() {
  const [searchParams] = useSearchParams();
  let queryTab = searchParams.get("tab") || "";

  const menu = [
    { label: "Đã mua", tab: "purchased-titles", href: "?tab=purchased-titles" },
    { label: "Đã thuê", tab: "hired-titles", href: "?tab=hired-titles" },
  ];

  useEffect(() => {
    queryTab = searchParams.get("tab") || "";
  });

  return (
    <>
      <Container className={cx("transaction")}>
        <TabsContainer menu={menu} />
        {queryTab.includes(menu[0].tab) && <PurchasedTitles cx={cx} />}
        {queryTab.includes(menu[1].tab) && <HiredTitles cx={cx} />}
      </Container>
      {}
    </>
  );
}

export default TitleTransaction;
