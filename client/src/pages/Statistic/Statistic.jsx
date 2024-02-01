import classNames from "classnames/bind";
import { useEffect, useMemo } from "react";
import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

import { TabsContainer } from "components";
import IncomeStat from "./IncomeStat/IncomeStat";
import LikeViewStat from "./LikeViewStat/LikeViewStat";
import styles from "./styles/Statistic.module.scss";

const cx = classNames.bind(styles);

const menu = [
  {
    tab: "like-view",
    href: "?tab=like-view",
    label: "Lượt xem - Lượt thích",
    Component: LikeViewStat,
  },
  { tab: "income", href: "?tab=income", label: "Thu nhập cá nhân", Component: IncomeStat },
];

function Statistic() {
  const [searchParams] = useSearchParams();
  let queryTab = searchParams.get("tab") || "";
  const { Component } = useMemo(() => menu.find((item) => item.tab === queryTab), [queryTab, menu]);

  useEffect(() => {
    queryTab = searchParams.get("tab") || "";
  });

  return (
    <Container className={cx("wrapper")}>
      <TabsContainer menu={menu} />
      <Component />
    </Container>
  );
}

export default Statistic;
