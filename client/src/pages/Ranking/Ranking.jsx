import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";

import { getAllTitles } from "services/title";
import styles from "./assets/styles/Ranking.module.scss";
import RankingList from "./components/RankingList";
import Top5 from "./components/Top5";

const cx = classNames.bind(styles);

function Ranking() {
  const [titles, setTitles] = useState([]);
  const topFiveTitles = useMemo(() => titles?.slice(0, 5), [titles]);
  const restRankTitles = useMemo(() => titles?.slice(5), [titles]);
  const hasData = titles.length > 0;

  const fetchData = () => {
    getAllTitles({
      sort: "like",
      order: "asc",
      limit: 50,
      page: 1,
    })
      .then((response) => setTitles(response.data))
      .catch((error) => console.log(error));
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
            <RankingList
              col={{ md: 6, lg: 4 }}
              startRank={6}
              titles={restRankTitles}
            />
          </Container>
        </div>
      )}
      {}
    </>
  );
}

export default Ranking;
