import classNames from "classnames/bind";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

import { TabsContainer } from "components";
import { useToast } from "hooks";
import IncomeStat from "./components/IncomeStat";
import LikeViewStat from "./components/LikeViewStat";
import styles from "./styles/Statistic.module.scss";

const cx = classNames.bind(styles);

function Statistic() {
  const { Toast, options, toastEmitter } = useToast();
  const [searchParams] = useSearchParams();
  let queryTab = searchParams.get("tab") || "";
  const menu = [
    { tab: "like-view", href: "?tab=like-view", label: "Lượt xem - Lượt thích" },
    { tab: "income", href: "?tab=income", label: "Thu nhập cá nhân" },
  ];

  useEffect(() => {
    queryTab = searchParams.get("tab") || "";
  });

  return (
    <>
      <Container className={cx("wrapper")}>
        <TabsContainer menu={menu} />
        {queryTab.includes(menu[0].tab) && <LikeViewStat toastEmitter={toastEmitter} />}
        {queryTab.includes(menu[1].tab) && <IncomeStat toastEmitter={toastEmitter} />}
      </Container>
      <Toast {...options} />
    </>
  );
}

export default Statistic;
