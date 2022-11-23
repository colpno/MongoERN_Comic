/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsQuestionCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { roundNumByUnit, separateNumberDigit } from "utils";

import { Popup } from "features";
import { setMyTitles } from "libs/redux/slices/myTitlesSlice";
import { getAllTitlesByUserID } from "services/title";
import { BookLine, DollarLine, EyeLine, ThumbUpLine } from "../assets/images";
import styles from "../assets/styles/StatisticCount.module.scss";
import IncomePopup from "./IncomePopup";

const cx = classNames.bind(styles);

// 10K likes = 1M vnd
// 1 like = 100 vnd
function StatisticCount() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { titles } = getAllTitlesByUserID(user.guid);
  const [data, setData] = useState({ likes: 0, views: 0, totalTitles: 0 });
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thu nhập",
    content: <IncomePopup />,
  });

  const handleIncomeExplainClick = () => {
    setPopup((prev) => {
      return { ...prev, trigger: true };
    });
  };

  useEffect(() => {
    titles.length > 0 && dispatch(setMyTitles(titles));
  }, [titles]);

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
          <strong className={cx("statistic-count__like__number")}>
            {roundNumByUnit(data.views)}
          </strong>
        </Col>
        {/* <Col className={cx("statistic-count__col")}>
          <ChatLine className={cx("statistic-count__comment__icon")} />
          <p className={cx("statistic-count__comment__label")}>
            Lượt bình luận
          </p>
          <strong className={cx("statistic-count__comment__number")}>0</strong>
        </Col> */}
        {/* <Col className={cx("statistic-count__col")}>
          <DollarLine className={cx("statistic-count__income__icon")} />
          <div className={cx("statistic-count__label-container")}>
            <p className={cx("statistic-count__income__label")}>
              Thu nhập (VNĐ)
            </p>
            <BsQuestionCircle
              className={cx("statistic-count__income__question-icon")}
              onClick={handleIncomeExplainClick}
            />
          </div>
          <strong className={cx("statistic-count__income__number", "active")}>
            {separateNumberDigit(user.income)}
          </strong>
        </Col> */}
      </Row>
      <Popup popup={popup} setPopup={setPopup} />
    </Container>
  );
}

export default StatisticCount;
