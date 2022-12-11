import classNames from "classnames/bind";
import { Slider } from "features";
import PropTypes from "prop-types";
import { memo } from "react";
import { SwiperSlide } from "swiper/react";

import styles from "./assets/BannerSlider.module.scss";

const cx = classNames.bind(styles);

function BannerSlider({ images, clickable, delay }) {
  return (
    <Slider
      navigation
      grabCursor
      pagination
      clickablePagination={clickable}
      delay={delay}
      loop
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
    </Slider>
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
