import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo, useState } from "react";
import { Container } from "react-bootstrap";

import { Button, HeadTitleMark } from "components";
import { useObserver } from "hooks";
import Top5 from "pages/Ranking/components/Top5";
import styles from "../styles/ComicRankingSection.module.scss";

const cx = classNames.bind(styles);

function ComicRankingSection({ top5 }) {
  const [isActivated, setIsActivated] = useState(false);
  const { setLastElementRef } = useObserver(
    () => setIsActivated(true),
    () => setIsActivated(false)
  );

  return (
    <section className={cx("ranking-section")}>
      <Container>
        <header className={cx("head", isActivated && "active")} ref={setLastElementRef}>
          <HeadTitleMark classname={cx("title")}>
            <h3>Ranking</h3>
          </HeadTitleMark>
          <Button text to="/comic/ranking" className={cx("btn--more")}>
            Xem thêm
          </Button>
        </header>
        <Top5 titles={top5} />
      </Container>
    </section>
  );
}

ComicRankingSection.propTypes = {
  top5: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default memo(ComicRankingSection);
