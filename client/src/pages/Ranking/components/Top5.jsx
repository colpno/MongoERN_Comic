import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";

import { useObserver } from "hooks";
import styles from "../styles/Top5.module.scss";
import RankingFigure from "./RankingFigure";

const cx = classNames.bind(styles);

function Top5({ titles }) {
  const [isActivated, setIsActivated] = useState(false);
  const { setLastElementRef } = useObserver(
    () => setIsActivated(true),
    () => setIsActivated(false)
  );

  const { top2, top3, top5 } = useMemo(
    () => ({
      top2: titles.slice(0, 2),
      top3: titles[2],
      top5: titles.slice(3, 5),
    }),
    [titles]
  );

  return (
    <div className={cx("top5-wrapper")} ref={setLastElementRef}>
      <Row className={cx("top-5-list")}>
        {top2.map((top, index) => {
          return (
            <Col
              md={12}
              lg={6}
              key={index}
              className={cx("top", isActivated && "active", `top-${index + 1}`)}
            >
              <RankingFigure
                data={top}
                rank={index + 1}
                classN={{
                  bookmark: cx("icon-bookmark"),
                  boxImg: cx("box-img"),
                  content: cx("figure__content"),
                }}
                showSummary
              />
            </Col>
          );
        })}
        <Col
          md={{ span: 8, offset: 2 }}
          lg={{ span: 4, offset: 0 }}
          className={cx("top", isActivated && "active", `top-3`)}
        >
          <RankingFigure
            data={top3}
            rank={3}
            classN={{
              bookmark: cx("icon-bookmark"),
            }}
          />
        </Col>
        {top5.map((top, index) => {
          return (
            <Col
              sm={12}
              md={6}
              lg={4}
              key={index + 4}
              className={cx("top", isActivated && "active", `top-${index + 4}`)}
            >
              <RankingFigure data={top} rank={index + 4} />
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
