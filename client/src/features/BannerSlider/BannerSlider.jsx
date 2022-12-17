import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";
import { SwiperSlide } from "swiper/react";

import { noData } from "assets/images";
import { Button } from "components";
import { Slider } from "features";

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
      {images.length > 0 ? (
        images.map((img, index) => {
          const { image, link } = img;

          return (
            <SwiperSlide key={index}>
              <Button wrapper to={link} className={cx("slide")}>
                <img src={image} alt="title" />
              </Button>
            </SwiperSlide>
          );
        })
      ) : (
        <img src={noData} alt="No slides" className={cx("slide")} />
      )}
    </Slider>
  );
}

BannerSlider.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  clickable: PropTypes.bool,
  delay: PropTypes.number,
};

BannerSlider.defaultProps = {
  clickable: true,
  delay: 4000,
};

export default memo(BannerSlider);
