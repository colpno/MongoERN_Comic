import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";
import { Autoplay, Lazy, Navigation, Pagination, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./assets/BannerSlider.module.scss";
import "./assets/swiper.scss";

const cx = classNames.bind(styles);

function BannerSlider({ images, clickable, delay }) {
  return (
    <Swiper
      modules={[Navigation, Thumbs, Pagination, Autoplay, Lazy]}
      loop
      navigation
      preloadImages={false}
      lazy
      pagination={{ clickable }}
      autoplay={{ delay }}
      grabCursor
      slidesPerView={1}
      className={cx("slider")}
    >
      {images.map((img, index) => {
        return (
          <SwiperSlide key={index}>
            <div className={cx("slide")}>
              <img src={img} alt="title" />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

BannerSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  clickable: PropTypes.bool,
  delay: PropTypes.number,
};

BannerSlider.defaultProps = {
  clickable: true,
  delay: 4000,
};

export default memo(BannerSlider);
