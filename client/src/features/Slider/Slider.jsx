import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Autoplay,
  Lazy,
  Pagination,
  Navigation,
  Thumbs,
  Scrollbar,
  Parallax,
  EffectFade,
  EffectCube,
  EffectFlip,
  EffectCards,
  EffectCoverflow,
  EffectCreative,
} from "swiper";
import { Swiper } from "swiper/react";

import styles from "./Slider.module.scss";

const cx = classNames.bind(styles);

function Slider({
  className,
  children,

  navigation,
  outsideNavigation,

  pagination,
  progressivePagination,
  fractionalPagination,
  clickablePagination,

  scrollbar,

  vertical,
  parallax,

  delay,
  grabCursor,
  lazy,
  loop,
  preloadImages,
  centeredSlides,
  spaceBetween,

  slidesPerView,
  slidesPerGroup,
  breakpoints,

  fadeEffect,
  flipEffect,
  cubeEffect,
  coverFlowEffect,
  cardEffect,
  creativeEffect,
}) {
  const navigationPrevRef = outsideNavigation ? useRef(null) : null;
  const navigationNextRef = outsideNavigation ? useRef(null) : null;
  const sliderRef = outsideNavigation ? useRef(null) : null;
  const [numberOfSlides, setNumberOfSlides] = useState(0);
  const [hideNavigation, setHideNavigation] = useState(false);
  const [swiperLength, setSwiperLength] = useState({
    reachBegin: true,
    reachEnd: false,
  });

  // Autoplay
  const autoplay = delay !== 0 ? { delay } : false;

  // Get swiper module
  const modules = [];
  pagination && modules.push(Pagination);
  navigation && modules.push(Navigation);
  grabCursor && modules.push(Thumbs);
  autoplay && modules.push(Autoplay);
  lazy && modules.push(Lazy);
  scrollbar && modules.push(Scrollbar);
  parallax && modules.push(Parallax);
  fadeEffect && modules.push(EffectFade);
  cubeEffect && modules.push(EffectCube);
  flipEffect && modules.push(EffectFlip);
  cardEffect && modules.push(EffectCards);
  coverFlowEffect && modules.push(EffectCoverflow);
  creativeEffect && modules.push(EffectCreative);

  // Slide direction
  const direction = vertical ? "vertical" : "horizontal";

  // Slide change effect
  let effect = false;
  if (fadeEffect) effect = "fade";
  if (cubeEffect) effect = "cube";
  if (flipEffect) effect = "flip";
  if (cardEffect) effect = "slide";
  if (coverFlowEffect) effect = "coverflow";
  if (creativeEffect) effect = "creative";

  // Slides per
  // eslint-disable-next-line no-unused-vars
  const viewSlide = slidesPerView !== 0 ? slidesPerView : false;
  const groupSlide = slidesPerGroup !== 0 ? slidesPerGroup : false;

  // Navigation
  const nav =
    navigation ||
    (outsideNavigation
      ? {
          nextEl: navigationNextRef.current,
          prevEl: navigationPrevRef.current,
        }
      : false);

  // Pagination
  let page = false;
  if (pagination) {
    page = { clickable: clickablePagination };
  }
  if (fractionalPagination) {
    page = { clickable: clickablePagination, type: "fraction" };
  }
  if (progressivePagination) {
    page = { clickable: clickablePagination, type: "progressbar" };
  }

  // Previous slide for custom navigation buttons
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  // Next slide for custom navigation buttons
  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const handleSlideChange = (slide) => {
    if (slide.isBeginning) {
      setSwiperLength({
        reachBegin: true,
        reachEnd: false,
      });
    }

    if (!slide.isBeginning && !slide.isEnd) {
      setSwiperLength({
        reachBegin: false,
        reachEnd: false,
      });
    }

    if (slide.isEnd) {
      setSwiperLength({
        reachBegin: false,
        reachEnd: true,
      });
    }
  };

  const handleBreakpointChange = (swiper) => {
    const isChecked =
      numberOfSlides > breakpoints[swiper.currentBreakpoint].slidesPerView &&
      swiper.isBeginning &&
      swiper.isEnd;

    isChecked ? setHideNavigation(false) : setHideNavigation(true);
  };

  const swiperProps = {
    ref: sliderRef,
    onSlideChange: handleSlideChange,
    className: `${cx("slider")} ${className}`,
  };
  if (modules.length > 0) swiperProps.modules = modules;
  if (navigation) swiperProps.navigation = nav;
  if (pagination) swiperProps.pagination = page;
  if (loop) swiperProps.loop = loop;
  if (preloadImages) swiperProps.preloadImages = preloadImages;
  if (lazy) swiperProps.lazy = lazy;
  if (Object.keys(autoplay).length > 0) swiperProps.autoplay = autoplay;
  if (grabCursor) swiperProps.grabCursor = grabCursor;
  if (centeredSlides) swiperProps.centeredSlides = centeredSlides;
  if (spaceBetween !== 0) swiperProps.spaceBetween = spaceBetween;
  if (Object.keys(breakpoints).length > 0) {
    swiperProps.breakpoints = breakpoints;
    swiperProps.onBreakpoint = handleBreakpointChange;
  }
  if (scrollbar) swiperProps.scrollbar = scrollbar;
  if (parallax) swiperProps.parallax = parallax;
  if (effect !== false) swiperProps.effect = effect;
  if (direction !== "horizontal") swiperProps.direction = direction;

  const nonGroupSliderProps = {
    ...swiperProps,
    slidesPerView: viewSlide,
  };

  const groupSliderProps = {
    ...swiperProps,
    slidesPerGroup: groupSlide,
  };

  // If number of slides <= slides per view, will not show navigation buttons
  useEffect(() => {
    if (sliderRef?.current) {
      const child = sliderRef.current.children[0].children.length;

      setNumberOfSlides(child);

      child <= slidesPerView
        ? setHideNavigation(true)
        : setHideNavigation(false);
    }
  }, [sliderRef]);

  return (
    <>
      {outsideNavigation && !hideNavigation && (
        <div
          className={`${cx(
            "previous",
            swiperLength.reachBegin && "disable"
          )} swiper-button-prev`}
          ref={navigationPrevRef}
          onClick={handlePrev}
        />
      )}
      {slidesPerView !== 0 && (
        <Swiper {...nonGroupSliderProps}>{children}</Swiper>
      )}
      {slidesPerGroup !== 0 && (
        <Swiper {...groupSliderProps}>{children}</Swiper>
      )}
      {outsideNavigation && !hideNavigation && (
        <div
          className={`${cx(
            "next",
            swiperLength.reachEnd && "disable"
          )} swiper-button-next`}
          ref={navigationNextRef}
          onClick={handleNext}
        />
      )}
    </>
  );
}

Slider.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,

  navigation: PropTypes.bool,
  outsideNavigation: PropTypes.bool,

  pagination: PropTypes.bool,
  progressivePagination: PropTypes.bool,
  fractionalPagination: PropTypes.bool,
  clickablePagination: PropTypes.bool,

  scrollbar: PropTypes.bool,

  vertical: PropTypes.bool,
  parallax: PropTypes.bool,

  delay: PropTypes.number,
  grabCursor: PropTypes.bool,
  lazy: PropTypes.bool,
  loop: PropTypes.bool,
  preloadImages: PropTypes.bool,
  centeredSlides: PropTypes.bool,
  spaceBetween: PropTypes.number,

  slidesPerView: PropTypes.number,
  slidesPerGroup: PropTypes.number,
  breakpoints: PropTypes.objectOf(
    PropTypes.shape({
      slidesPerView: PropTypes.number.isRequired,
    }).isRequired
  ),

  fadeEffect: PropTypes.bool,
  flipEffect: PropTypes.bool,
  cubeEffect: PropTypes.bool,
  coverFlowEffect: PropTypes.bool,
  cardEffect: PropTypes.bool,
  creativeEffect: PropTypes.bool,
};

Slider.defaultProps = {
  className: "",

  navigation: false,
  outsideNavigation: false,

  pagination: false,
  progressivePagination: false,
  fractionalPagination: false,
  clickablePagination: false,

  delay: 0,
  grabCursor: false,
  lazy: false,
  loop: false,
  preloadImages: false,
  centeredSlides: false,
  spaceBetween: 0,

  scrollbar: false,

  vertical: false,
  parallax: false,

  slidesPerView: 0,
  slidesPerGroup: 0,
  breakpoints: {},

  fadeEffect: false,
  flipEffect: false,
  cubeEffect: false,
  coverFlowEffect: false,
  cardEffect: false,
  creativeEffect: false,
};

export default memo(Slider);
