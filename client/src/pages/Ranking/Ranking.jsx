import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";

import { titleService } from "services";
import styles from "./styles/Ranking.module.scss";
import RankingList from "./components/RankingList";
import Top5 from "./components/Top5";

const cx = classNames.bind(styles);

function Ranking() {
  const [titles, setTitles] = useState([]);
  const topFiveTitles = useMemo(() => titles?.slice(0, 5), [titles]);
  const restRankTitles = useMemo(() => titles?.slice(5), [titles]);
  const hasData = titles.length > 0;

  const fetchData = () => {
    titleService
      .getAll(
        {
          _sort: "like",
          _order: "asc",
          _limit: 50,
          _page: 1,
          _embed: JSON.stringify([
            { collection: "approved_status_id", fields: "-_id code", match: { code: "apd" } },
            { collection: "status_id", fields: "-_id code", match: { code: "vis" } },
          ]),
          _fields: "-__v -_guid -cover.cloud_public_id",
        },
        false
      )
      .then((response) => {
        const approvedTitles = response.data.filter((title) => title.approved_status_id);
        setTitles(approvedTitles);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

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
