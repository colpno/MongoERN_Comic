import classNames from "classnames/bind";
import { Container } from "react-bootstrap";
import { sortTitles } from "services/titleServices";
import styles from "./assets/styles/Ranking.module.scss";
import RankingList from "./components/RankingList";
import Top5 from "./components/Top5";

const cx = classNames.bind(styles);

function Ranking() {
  const { titles } = sortTitles();
  const topFiveTitles = titles.slice(0, 5);
  const restRankTitles = titles.slice(5);
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
            <RankingList titles={restRankTitles} />
          </Container>
        </div>
      )}
      {}
    </>
  );
}

export default Ranking;
