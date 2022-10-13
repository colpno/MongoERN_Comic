import classNames from "classnames/bind";
import { memo } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

import styles from "pages/Ranking/assets/styles/Top5.module.scss";
import RankingFigure from "./RankingFigure";

const cx = classNames.bind(styles);

function Top5({ titles }) {
  const top2 = titles.slice(0, 2);
  const top3 = titles.slice(2, 3);
  const top5 = titles.slice(3, 5);

  return (
    <div className={cx("top5-wrapper")}>
      <Row className={cx("top5-wrapper__cards")}>
        {top2.map((data, index) => {
          return (
            <Col
              md={12}
              lg={6}
              key={index}
              className={cx("top5-wrapper__cards__card", "top-2")}
            >
              <RankingFigure
                data={data}
                classN={{
                  bookmark: cx("icon-bookmark"),
                  boxImg: cx("box-img"),
                  content: cx("figure__content"),
                }}
              />
            </Col>
          );
        })}
        {top3.map((data, index) => {
          return (
            <Col
              md={12}
              lg={4}
              key={index}
              className={cx("top5-wrapper__cards__card", "top-3")}
            >
              <RankingFigure
                data={data}
                classN={{
                  bookmark: cx("icon-bookmark"),
                }}
              />
            </Col>
          );
        })}
        {top5.map((data, index) => {
          return (
            <Col
              sm={12}
              md={6}
              lg={4}
              key={index}
              className={cx("top5-wrapper__cards__card", "top-4-5")}
            >
              <RankingFigure data={data} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

Top5.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default memo(Top5);
