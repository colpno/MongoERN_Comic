/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
import { BsQuestionCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { roundNumByUnit } from "utils";
import {
  BookLine,
  ChatLine,
  DollarLine,
  EyeLine,
  ThumbUpLine,
} from "../assets/images";
import styles from "../assets/styles/StatisticCount.module.scss";

const cx = classNames.bind(styles);

function StatisticCount() {
  const { totalChapters, likes, views } = useSelector(
    (state) => state.statisticCount
  );

  return (
    <Container className={cx("statistic-count")}>
      <Row>
        <Col className={cx("statistic-count__col")}>
          <BookLine className={cx("statistic-count__total-title__icon")} />
          <p className={cx("statistic-count__total-title__label")}>
            Tổng số truyện
          </p>
          <strong className={cx("statistic-count__total-title__number")}>
            {totalChapters}
          </strong>
        </Col>
        <Col className={cx("statistic-count__col")}>
          <EyeLine className={cx("statistic-count__view__icon")} />
          <p className={cx("statistic-count__view__label")}>Lượt xem</p>
          <strong className={cx("statistic-count__view__number")}>
            {roundNumByUnit(likes)}
          </strong>
        </Col>
        <Col className={cx("statistic-count__col")}>
          <ThumbUpLine className={cx("statistic-count__view__icon")} />
          <p className={cx("statistic-count__like__label")}>Lượt thích</p>
          <strong className={cx("statistic-count__like__number", "active")}>
            {roundNumByUnit(views)}
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
