import PropTypes from "prop-types";
import { memo } from "react";
import { Container } from "react-bootstrap";
import classNames from "classnames/bind";

import Button from "components/Button";
import Top5 from "pages/Ranking/components/Top5";
import styles from "../../../assets/styles/ComicRankingSection.module.scss";

const cx = classNames.bind(styles);

function ComicRankingSection({ top5 }) {
  return (
    <section className={cx("ranking__wrapper")}>
      <Container className={cx("container", "ranking")}>
        <header className={cx("head")}>
          <h3 className={cx("title")}>Ranking</h3>
          <Button text to="/comic/ranking">
            Xem them
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
