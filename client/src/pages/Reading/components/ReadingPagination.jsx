import classNames from "classnames/bind";
import { IoIosLock } from "react-icons/io";
import PropTypes from "prop-types";
import { memo } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { SwiperSlide } from "swiper/react";

import { Button } from "components";
import { Slider } from "features";
import styles from "../assets/styles/ReadingPagination.module.scss";

const cx = classNames.bind(styles);

function ReadingPagination({ chapters, boughtChapter }) {
  const { titleId, page } = useParams();

  return (
    <div className={cx("reading-page__pagination")}>
      <Container className={cx("reading-page__pagination__container")}>
        <Slider
          outsideNavigation
          grabCursor
          preloadImages={false}
          lazy
          spaceBetween={20}
          slidesPerView={7}
          breakpoints={{
            480: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 5,
            },
            960: {
              slidesPerView: 7,
            },
          }}
        >
          {chapters.map((chapter) => {
            const isBought = boughtChapter.some((bought) => bought._id === chapter._id);

            return (
              <SwiperSlide key={chapter._id}>
                <Button
                  wrapper
                  to={isBought ? `/comic/title/${titleId}/${chapter.order}` : undefined}
                  className={cx("slide-wrapper", page === `${chapter.order}` ? "active" : "")}
                >
                  <div className={cx("box-img")}>
                    <img
                      src={chapter.cover.source}
                      alt={`Chương ${chapter.order}${chapter.title ? `: ${chapter.title}` : ""}`}
                    />
                  </div>
                  <span className={cx("content")}>
                    {!isBought && <IoIosLock className={cx("lock-icon")} />}
                    {`Chương ${chapter.order}${chapter.title ? `: ${chapter.title}` : ""}`}
                  </span>
                </Button>
              </SwiperSlide>
            );
          })}
        </Slider>
      </Container>
    </div>
  );
}

ReadingPagination.propTypes = {
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      order: PropTypes.number.isRequired,
      cover: PropTypes.shape({
        source: PropTypes.string.isRequired,
      }).isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,

  boughtChapter: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default memo(ReadingPagination);
