/* eslint-disable no-unused-vars */
import titleApi from "api/titleApi";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./assets/styles/Ranking.module.scss";
import RankingList from "./components/RankingList";
import Top5 from "./components/Top5";

const cx = classNames.bind(styles);

function Ranking() {
  const [titles, setTitles] = useState([]);
  const topFiveTitles = titles.slice(0, 5);
  const restRankTitles = titles.slice(5);
  const hasData = titles.length;

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await titleApi.sort("rank", "asc", {
          _limit: 50,
          _page: 1,
        });
        setTitles(response.data);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchTitles();
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
            <RankingList titles={restRankTitles} />
          </Container>
        </div>
      )}
      {}
    </>
  );
}

export default Ranking;
