import classNames from "classnames/bind";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

import TabsContainer from "components/TabsContainer";
import { getAllTitles } from "services/title";
import HiredChapters from "./pages/HiredChapters";
import PurchasedChapters from "./pages/PurchasedChapters";
import styles from "./styles/TitleTransaction.module.scss";

const cx = classNames.bind(styles);

function TitleTransaction() {
  const [searchParams] = useSearchParams();
  let queryTab = searchParams.get("tab") || "";
  const { titles } = getAllTitles();

  const menu = [
    { label: "Đã mua", tab: "purchased-titles", href: "?tab=purchased-titles" },
    { label: "Đã thuê", tab: "hired-titles", href: "?tab=hired-titles" },
  ];

  useEffect(() => {
    queryTab = searchParams.get("tab") || "";
  });

  return (
    <>
      {titles.length > 0 && (
        <Container className={cx("transaction")}>
          <TabsContainer menu={menu} />
          {queryTab.includes(menu[0].tab) && (
            <PurchasedChapters cx={cx} titles={titles} />
          )}
          {queryTab.includes(menu[1].tab) && (
            <HiredChapters cx={cx} titles={titles} />
          )}
        </Container>
      )}
      {}
    </>
  );
}

export default TitleTransaction;
