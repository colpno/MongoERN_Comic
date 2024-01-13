import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { SwiperSlide } from "swiper/react";

import { Button } from "components";
import { Slider } from "features";
import styles from "../assets/styles/ReadingPagination.module.scss";

const cx = classNames.bind(styles);

function ReadingPagination({ chapters }) {
  const { titleId, chapterId } = useParams();

  return (
    <div className={cx("reading-page__pagination")}>
      <Container className={cx("reading-page__pagination__container")}>
        <Slider
          outsideNavigation
          grabCursor
          centeredSlides
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
            return (
              <SwiperSlide key={chapter._id}>
                <Button
                  wrapper
                  to={`/comic/title/${titleId}/${chapter._id}`}
                  className={cx("slide-wrapper", chapterId === chapter._id ? "active" : "")}
                >
                  <div className={cx("box-img")}>
                    <img src={chapter.cover.source} alt={chapter.title} />
                  </div>
                  <span className={cx("content")}>{chapter.title}</span>
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
};

export default memo(ReadingPagination);
