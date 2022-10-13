import PropTypes from "prop-types";
import { memo } from "react";
import { Link } from "react-router-dom";

import { Lazy, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "../assets/styles/ReadingPagination.scss";

function ReadingPagination({ chapterId, titleId, chapters }) {
  return (
    <div className="reading-page__pagination">
      <div className="reading-page__pagination__container">
        <Swiper
          modules={[Navigation, Thumbs, Lazy]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
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
          className="reading-page__pagination__container__chapters"
        >
          {chapters.map((chapter) => {
            return (
              <SwiperSlide
                key={chapter.id}
                className={chapterId === chapter.order ? " current" : ""}
              >
                <Link to={`/comic/title/${titleId}/${chapter.order}`}>
                  <div className="box-img">
                    <img src={chapter.coverImage} alt={chapter.titleName} />
                  </div>
                  <span className="content">{chapter.titleName}</span>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div
          type="button"
          className="reading-page__pagination__move-left swiper-button-prev"
        />
        <div
          type="button"
          className="reading-page__pagination__move-right swiper-button-next"
        />
      </div>
    </div>
  );
}

ReadingPagination.propTypes = {
  titleId: PropTypes.string.isRequired,
  chapterId: PropTypes.number.isRequired,
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      order: PropTypes.number.isRequired,
      coverImage: PropTypes.string.isRequired,
      titleName: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default memo(ReadingPagination);
