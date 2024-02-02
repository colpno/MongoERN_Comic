import classNames from "classnames/bind";
import { useMemo } from "react";
import { Container } from "react-bootstrap";

import { useGetTitles } from "hooks/index.jsx";
import RankingList from "./components/RankingList";
import Top5 from "./components/Top5";
import styles from "./styles/Ranking.module.scss";

const cx = classNames.bind(styles);

function Ranking() {
  const { data: titles = [] } = useGetTitles(
    {
      _sort: {
        like: -1,
        view: -1,
      },
      _limit: 50,
      _page: 1,
      _embed: JSON.stringify([
        { collection: "approved_status_id", fields: "-_id code", match: { code: "apd" } },
        { collection: "status_id", fields: "-_id code", match: { code: "vis" } },
      ]),
    },
    false
  );

  const topFiveTitles = useMemo(() => titles.slice(0, 5), [titles]);
  const restRankTitles = useMemo(() => titles.slice(5), [titles]);
  const hasData = titles.length > 0;

  return (
    <>
      {hasData && (
        <div className={cx("ranking-page")}>
          <div className={cx("top5-wrapper")}>
            <Container>
              <Top5 titles={topFiveTitles} />
            </Container>
          </div>
          <Container className={cx("top-wrapper")}>
            <RankingList col={{ md: 6, lg: 4 }} startRank={6} titles={restRankTitles} />
          </Container>
        </div>
      )}
      {}
    </>
  );
}

export default Ranking;
