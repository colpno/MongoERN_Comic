/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

import { TabsContainer } from "components";
import { useMemo } from "react";
import HiredChapters from "./pages/HiredChapters";
import PurchasedChapters from "./pages/PurchasedChapters";
import styles from "./styles/TitleTransaction.module.scss";

const cx = classNames.bind(styles);

function TitleTransaction() {
  const [searchParams] = useSearchParams();
  const queryTab = searchParams.get("tab") || "";
  const menu = [
    {
      label: "Đã mua",
      tab: "purchased-titles",
      href: "?tab=purchased-titles",
      Component: PurchasedChapters,
    },
    // { label: "Đã thuê", tab: "hired-titles", href: "?tab=hired-titles", Component: HiredChapters },
  ];
  const Component = useMemo(
    () => menu.find((item) => item.tab === queryTab)?.Component,
    [queryTab, menu]
  );

  return (
    <Container className={cx("transaction")}>
      <TabsContainer menu={menu} />
      {Component && <Component />}
    </Container>
  );
}

export default TitleTransaction;
