import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";
import { Container } from "react-bootstrap";

import { Button, HeadTitleMark } from "components";
import Top5 from "pages/Ranking/components/Top5";
import { Slide } from "react-awesome-reveal";
import styles from "../styles/ComicRankingSection.module.scss";

const cx = classNames.bind(styles);

function ComicRankingSection({ top5 }) {
  return (
    <section className={cx("ranking-section")}>
      <Container>
        <header className={cx("head")}>
          <Slide triggerOnce>
            <HeadTitleMark classname={cx("title")}>
              <h3>Ranking</h3>
            </HeadTitleMark>
          </Slide>
          <Slide direction="right" triggerOnce>
            <Button text to="/comic/ranking" className={cx("btn--more")}>
              Xem thêm
            </Button>
          </Slide>
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
