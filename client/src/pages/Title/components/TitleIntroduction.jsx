import classNames from "classnames/bind";
import { Button } from "components";
import { emitToast } from "features/Toast.jsx";
import { NoData } from "features/index.jsx";
import { useGetChapterTransactions, useToggleFollow } from "hooks/index.jsx";
import { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { AiFillCopy, AiFillEye, AiFillHeart, AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { roundNumByUnit } from "utils";
import styles from "../styles/Introduction.module.scss";
import TitleIntroductionGenres from "./TitleIntroductionGenres.jsx";
import TitleIntroductionSummary from "./TitleIntroductionSummary.jsx";

const cx = classNames.bind(styles);

const FIRST_CHAPTER = "1";

function TitleIntroduction() {
  const { titleId } = useParams();
  const title = useSelector((state) => state.title.title);
  const user = useSelector((state) => state.user.user);
  const { handleToggle: handleToggleFollow, isFollowed } = useToggleFollow(titleId);
  const { data: firstChapter = [] } = useGetChapterTransactions({
    title_id: titleId,
    _embed: JSON.stringify([{ collection: "chapter_id", match: { order: 1 } }]),
    _fields: "_id",
  });
  const hasChapter = title?.total_chapter !== 0;
  const isOwned = firstChapter.length > 0 ? firstChapter[0] : false;
  const isFree = firstChapter.length > 0 ? !firstChapter[0].cost : false;
  const canRead = isOwned || isFree;

  const handleClickFirstChapter = () => {
    if (!canRead) emitToast("Bạn cần phải mua chương 1 để có thể dọc", "info");
  };

  if (!title) {
    return (
      <NoData>
        <h6>Không có truyện nào để hiển thị!</h6>
      </NoData>
    );
  }

  return (
    <div className={cx("introduction")}>
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
            {title.user_id !== user._id && (
              <Button outline large onClick={() => handleToggleFollow(title._id)}>
                <AiFillStar />
                {isFollowed ? "Hủy theo dõi" : "Theo dõi"}
              </Button>
            )}
            {hasChapter && (
              <Button
                to={canRead ? FIRST_CHAPTER : ""}
                primary
                large
                onClick={() => handleClickFirstChapter()}
              >
                <AiFillCopy />
                Đọc chương đầu
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default memo(TitleIntroduction);
