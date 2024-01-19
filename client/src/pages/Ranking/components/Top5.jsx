import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import { Col, Row } from "react-bootstrap";

import { Slide } from "react-awesome-reveal";
import styles from "../styles/Top5.module.scss";
import RankingFigure from "./RankingFigure";

const cx = classNames.bind(styles);

function Top5({ titles }) {
  const { top2, top3, top5 } = useMemo(
    () => ({
      top2: titles.slice(0, 2),
      top3: titles[2],
      top5: titles.slice(3, 5),
    }),
    [titles]
  );

  return (
    <div className={cx("top5-wrapper")}>
      <Row className={cx("top-5-list")}>
        {top2[0] && (
          <Col md={12} lg={6} className={cx("top", `top-1`)}>
            <Slide triggerOnce>
              <RankingFigure
                data={top2[0]}
                rank={1}
                classN={{
                  bookmark: cx("icon-bookmark"),
                  boxImg: cx("box-img"),
                  content: cx("figure__content"),
                }}
                showSummary
              />
            </Slide>
          </Col>
        )}
        {top2[1] && (
          <Col md={12} lg={6} className={cx("top", `top-2`)}>
            <Slide direction="right" triggerOnce>
              <RankingFigure
                data={top2[1]}
                rank={2}
                classN={{
                  bookmark: cx("icon-bookmark"),
                  boxImg: cx("box-img"),
                  content: cx("figure__content"),
                }}
                showSummary
              />
            </Slide>
          </Col>
        )}
        {top3 && (
          <Col
            md={{ span: 8, offset: 2 }}
            lg={{ span: 4, offset: 0 }}
            className={cx("top", `top-3`)}
          >
            <Slide direction="up" triggerOnce>
              <RankingFigure
                data={top3}
                rank={3}
                classN={{
                  bookmark: cx("icon-bookmark"),
                }}
              />
            </Slide>
          </Col>
        )}
        {top5.length > 0 &&
          top5.map((top, index) => {
            return (
              <Col sm={12} md={6} lg={4} key={index + 4} className={cx("top", `top-${index + 4}`)}>
                <Slide direction="up" triggerOnce>
                  <RankingFigure data={top} rank={index + 4} />
                </Slide>
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
