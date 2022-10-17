import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { roundNumByUnit } from "utils";

import { getTitlesByUerID } from "services/titleServices";
import { BookLine, EyeLine, ThumbUpLine } from "../assets/images";
import styles from "../assets/styles/StatisticCount.module.scss";

const cx = classNames.bind(styles);

function StatisticCount() {
  const userID = 1;
  const { titles } = getTitlesByUerID(userID);
  const [data, setData] = useState({ likes: 0, views: 0, totalTitles: 0 });

  useEffect(() => {
    if (titles.length > 0) {
      const likes = titles.reduce((total, title) => total + title.like, 0);
      const views = titles.reduce((total, title) => total + title.view, 0);
      setData({ likes, views, totalTitles: titles.length });
    }
  }, [titles]);

  return (
    <Container className={cx("statistic-count")}>
      <Row>
        <Col className={cx("statistic-count__col")}>
          <BookLine className={cx("statistic-count__total-title__icon")} />
          <p className={cx("statistic-count__total-title__label")}>
            Tổng số truyện
          </p>
          <strong className={cx("statistic-count__total-title__number")}>
            {data.totalTitles}
          </strong>
        </Col>
        <Col className={cx("statistic-count__col")}>
          <EyeLine className={cx("statistic-count__view__icon")} />
          <p className={cx("statistic-count__view__label")}>Lượt xem</p>
          <strong className={cx("statistic-count__view__number")}>
            {roundNumByUnit(data.likes)}
          </strong>
        </Col>
        <Col className={cx("statistic-count__col")}>
          <ThumbUpLine className={cx("statistic-count__view__icon")} />
          <p className={cx("statistic-count__like__label")}>Lượt thích</p>
          <strong className={cx("statistic-count__like__number", "active")}>
            {roundNumByUnit(data.views)}
          </strong>
        </Col>
        {/* <Col className={cx("statistic-count__col")}>
          <ChatLine className={cx("statistic-count__comment__icon")} />
          <p className={cx("statistic-count__comment__label")}>
            Lượt bình luận
          </p>
          <strong className={cx("statistic-count__comment__number")}>0</strong>
        </Col>
        <Col className={cx("statistic-count__col")}>
          <DollarLine className={cx("statistic-count__income__icon")} />
          <div className={cx("statistic-count__label-container")}>
            <p className={cx("statistic-count__income__label")}>
              Thu nhập (VNĐ)
            </p>
            <BsQuestionCircle
              className={cx("statistic-count__income__question-icon")}
            />
          </div>
          <strong className={cx("statistic-count__income__number")}>0</strong>
        </Col> */}
      </Row>
    </Container>
  );
}

export default StatisticCount;
