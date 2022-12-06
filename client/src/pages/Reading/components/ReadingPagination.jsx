import { Button } from "components";
import PropTypes from "prop-types";
import { memo, useRef } from "react";
import { useParams } from "react-router-dom";

import { Lazy, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "../assets/styles/ReadingPagination.scss";

function ReadingPagination({ chapters }) {
  const { titleId } = useParams();
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <div className="reading-page__pagination">
      <div className="reading-page__pagination__container">
        <Swiper
          modules={[Navigation, Thumbs, Lazy]}
          navigation={{
            nextEl: navigationNextRef,
            prevEl: navigationPrevRef,
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
              <SwiperSlide key={chapter.guid}>
                <Button
                  wrapper
                  to={`/comic/title/${titleId}/${chapter.guid}`}
                  className="slide-wrapper"
                >
                  <div className="box-img">
                    <img src={chapter.cover} alt={chapter.name} />
                  </div>
                  <span className="content">{chapter.name}</span>
                </Button>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div
          type="button"
          className="reading-page__pagination__move-left swiper-button-prev"
          ref={navigationPrevRef}
        />
        <div
          type="button"
          className="reading-page__pagination__move-right swiper-button-next"
          ref={navigationNextRef}
        />
      </div>
    </div>
  );
}

ReadingPagination.propTypes = {
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      order: PropTypes.number.isRequired,
      cover: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default memo(ReadingPagination);
