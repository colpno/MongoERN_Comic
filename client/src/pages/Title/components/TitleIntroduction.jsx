/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiFillCopy, AiFillEye, AiFillHeart, AiFillStar } from "react-icons/ai";

import { Button } from "components";
import { NoData } from "features/index.jsx";
import { useToggleFollow } from "hooks/index.jsx";
import { useSelector } from "react-redux";
import { roundNumByUnit } from "utils";
import styles from "../styles/Introduction.module.scss";
import TitleIntroductionGenres from "./TitleIntroductionGenres.jsx";
import TitleIntroductionSummary from "./TitleIntroductionSummary.jsx";

const cx = classNames.bind(styles);

const FIRST_CHAPTER = "1";

function TitleIntroduction() {
  const title = useSelector((state) => state.title.title);
  const { handleToggle: handleToggleFollow, isFollowed } = useToggleFollow();
  const hasChapter = title?.total_chapter !== 0;

  if (!title) {
    return (
      <NoData>
        <h6>Không có truyện nào để hiển thị!</h6>
      </NoData>
    );
  }

  return (
    <Container fluid="md" className={cx("introduction")}>
      <Row>
        <Col md={12} lg={5} className={cx("box-img")}>
          <img src={title.cover.source} alt={title.title} />
        </Col>
        <Col md={12} lg={7} className={cx("introduction__info")}>
          <h4 className={cx("title")}>{title.title}</h4>
          <div className={cx("introduction__info__statistic")}>
            <span className="like">
              <AiFillHeart />
              <span>{roundNumByUnit(title.like)}</span>
            </span>
            <span className="view">
              <AiFillEye />
              <span>{roundNumByUnit(title.view)}</span>
            </span>
          </div>
          <div className={cx("introduction__info__detail")}>
            <small className={cx("author")}>{title.author}</small>
            <small className={cx("genres")}>
              <TitleIntroductionGenres />
            </small>
            <small className={cx("summary")}>
              <TitleIntroductionSummary summary={title.summary} />
            </small>
          </div>
          <div className={cx("button-container")}>
            <Button outline large onClick={() => handleToggleFollow(title._id)}>
              <AiFillStar />
              {isFollowed ? "Hủy theo dõi" : "Theo dõi"}
            </Button>
            {hasChapter && (
              <Button to={FIRST_CHAPTER} primary large>
                <AiFillCopy />
                Đọc chương đầu
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default memo(TitleIntroduction);
