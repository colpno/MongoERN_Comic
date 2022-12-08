/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Autoplay, Lazy, Navigation, Pagination, Thumbs } from "swiper";
import { Swiper } from "swiper/react";

import styles from "./Slider.module.scss";

const cx = classNames.bind(styles);

function CustomNavigation(
  reachBegin,
  reachEnd,
  prevRef,
  nextRef,
  customStyles,
  handlePrev,
  handleNext
) {
  const { position, color } = customStyles;

  return (
    <>
      <div
        style={{ left: `${position}px`, color }}
        className={`${cx(
          "previous",
          reachBegin && "disable"
        )} swiper-button-prev`}
        ref={prevRef}
        onClick={handlePrev}
      />
      <div
        style={{ right: `${position}px`, color }}
        className={`${cx("next", reachEnd && "disable")} swiper-button-next`}
        ref={nextRef}
        onClick={handleNext}
      />
    </>
  );
}

function Slider({
  className,
  children,

  navigation,
  outsideNavigation,
  navigationStyles,
  pagination,
  clickablePagination,
  delay,
  grabCursor,
  lazy,
  loop,
  preloadImages,
  slidesPerView,
  centeredSlides,
  spaceBetween,
  breakpoints,
}) {
  const navigationPrevRef = outsideNavigation ? useRef(null) : null;
  const navigationNextRef = outsideNavigation ? useRef(null) : null;
  const sliderRef = outsideNavigation ? useRef(null) : null;

  const [hideNavigation, setHideNavigation] = useState(false);
  const [swiperLength, setSwiperLength] = useState({
    reachBegin: true,
    reachEnd: false,
  });

  const autoplay = delay !== 0 ? { delay } : false;

  const modules = [];
  pagination && modules.push(Pagination);
  navigation && modules.push(Navigation);
  grabCursor && modules.push(Thumbs);
  autoplay && modules.push(Autoplay);
  lazy && modules.push(Lazy);

  const showSlides = slidesPerView !== 0 ? slidesPerView : false;

  const nav =
    navigation ||
    (outsideNavigation
      ? {
          nextEl: navigationNextRef.current,
          prevEl: navigationPrevRef.current,
        }
      : false);

  const page = pagination ? { clickable: clickablePagination } : false;

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const handleReachBegin = useCallback(() => {
    setSwiperLength(() => ({
      reachBegin: true,
      reachEnd: false,
    }));
  }, []);

  const handleReachEnd = useCallback(() => {
    setSwiperLength(() => ({
      reachBegin: false,
      reachEnd: true,
    }));
  }, []);

  useEffect(() => {
    const child = document.querySelectorAll(".slider > * > *");
    child.length <= slidesPerView
      ? setHideNavigation(true)
      : setHideNavigation(false);
  });

  return (
    <div className={`${cx("slide-container")} ${className}`}>
      <Swiper
        ref={sliderRef}
        onReachBeginning={handleReachBegin}
        onReachEnd={handleReachEnd}
        modules={modules}
        loop={loop}
        preloadImages={preloadImages}
        lazy={lazy}
        pagination={page}
        autoplay={autoplay}
        grabCursor={grabCursor}
        slidesPerView={showSlides}
        centeredSlides={centeredSlides}
        spaceBetween={spaceBetween}
        navigation={nav}
        breakpoints={breakpoints}
        className="slider"
      >
        {children}
      </Swiper>
      {outsideNavigation &&
        !hideNavigation &&
        CustomNavigation(
          swiperLength.reachBegin,
          swiperLength.reachEnd,
          navigationPrevRef,
          navigationNextRef,
          navigationStyles,
          handlePrev,
          handleNext
        )}
    </div>
  );
}

Slider.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  navigation: PropTypes.bool,
  outsideNavigation: PropTypes.bool,
  navigationStyles: PropTypes.shape({
    position: PropTypes.number,
    color: PropTypes.string,
  }),
  pagination: PropTypes.bool,
  clickablePagination: PropTypes.bool,
  delay: PropTypes.number,
  grabCursor: PropTypes.bool,
  lazy: PropTypes.bool,
  loop: PropTypes.bool,
  preloadImages: PropTypes.bool,
  slidesPerView: PropTypes.number,
  centeredSlides: PropTypes.bool,
  spaceBetween: PropTypes.number,
  breakpoints: PropTypes.objectOf(
    PropTypes.shape({
      slidesPerView: PropTypes.number.isRequired,
    }).isRequired
  ),
};

Slider.defaultProps = {
  className: "",
  navigation: false,
  outsideNavigation: false,
  navigationStyles: { position: -50, color: "black" },
  pagination: false,
  clickablePagination: false,
  delay: 0,
  grabCursor: false,
  lazy: false,
  loop: false,
  preloadImages: false,
  slidesPerView: 0,
  centeredSlides: false,
  spaceBetween: 0,
  breakpoints: {},
};

export default memo(Slider);
