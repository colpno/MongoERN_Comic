import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsQuestionCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { roundNumByUnit, separateNumberDigit } from "utils";

import { Popup } from "features";
import { useGetTitles, usePopup } from "hooks";
import { setMyTitles } from "libs/redux/slices/title.slice";
import { BookLine, ChatLine, DollarLine, EyeLine, ThumbUpLine } from "../assets/images";
import styles from "../assets/styles/StatisticCount.module.scss";
import IncomePopup from "./IncomePopup";

const cx = classNames.bind(styles);

function StatisticCount() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [stat, setStat] = useState({ likes: 0, views: 0, totalTitles: 0, comments: 0 });
  const { popup, triggerPopup } = usePopup({
    isTriggered: false,
    title: "Thu nhập",
    content: <IncomePopup />,
  });
  const { data: titles = [], isSuccess } = useGetTitles({
    user_id: user._id,
    _embed: JSON.stringify([
      { collection: "approved_status_id", fields: "-_id code" },
      { collection: "status_id", fields: "-_id code" },
    ]),
  });

  useEffect(() => {
    if (isSuccess) dispatch(setMyTitles(titles));
  }, [isSuccess]);

  useEffect(() => {
    if (titles.length > 0) {
      const likes = titles.reduce((total, title) => total + title.like, 0);
      const views = titles.reduce((total, title) => total + title.view, 0);
      const comments = titles.reduce((total, title) => total + title.comment_num, 0);

      setStat({ likes, views, totalTitles: titles.length, comments });
    }
  }, [titles]);

  return (
    <Container className={cx("statistic-count")}>
      <Row>
        <Col>
          <div className={cx("statistic-count__group")}>
            <Col className={cx("statistic-count__col")}>
              <BookLine className={cx("statistic-count__total-title__icon")} />
              <p className={cx("statistic-count__total-title__label")}>Tổng số truyện</p>
              <strong className={cx("statistic-count__total-title__number")}>
                {roundNumByUnit(stat.totalTitles)}
              </strong>
            </Col>
            <Col className={cx("statistic-count__col")}>
              <EyeLine className={cx("statistic-count__view__icon")} />
              <p className={cx("statistic-count__view__label")}>Lượt xem</p>
              <strong className={cx("statistic-count__view__number")}>
                {roundNumByUnit(stat.views)}
              </strong>
            </Col>
            <Col className={cx("statistic-count__col")}>
              <ThumbUpLine className={cx("statistic-count__view__icon")} />
              <p className={cx("statistic-count__like__label")}>Lượt thích</p>
              <strong className={cx("statistic-count__like__number")}>
                {roundNumByUnit(stat.likes)}
              </strong>
            </Col>
            <Col className={cx("statistic-count__col")}>
              <ChatLine className={cx("statistic-count__comment__icon")} />
              <p className={cx("statistic-count__comment__label")}>Lượt bình luận</p>
              <strong className={cx("statistic-count__comment__number")}>
                {roundNumByUnit(stat.comments)}
              </strong>
            </Col>
            <Col className={cx("statistic-count__col")}>
              <DollarLine className={cx("statistic-count__income__icon")} />
              <div className={cx("statistic-count__label-container")}>
                <p className={cx("statistic-count__income__label")}>Thu nhập ($ - Dollar)</p>
                <BsQuestionCircle
                  className={cx("statistic-count__income__question-icon")}
                  onClick={() => triggerPopup(true)}
                />
              </div>
              <strong className={cx("statistic-count__income__number", "active")}>
                {separateNumberDigit(user.income)}
              </strong>
            </Col>
          </div>
        </Col>
      </Row>
      <Popup data={popup} trigger={triggerPopup} />
    </Container>
  );
}

export default StatisticCount;
