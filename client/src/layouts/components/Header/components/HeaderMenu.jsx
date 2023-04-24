import PropTypes from "prop-types";
import { memo } from "react";
import { useLocation } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import { Button } from "components";
import { Slider } from "features";

function HeaderMenu({ cx, menu }) {
  const url = useLocation().pathname;

  return (
    <Slider
      outsideNavigation
      grabCursor
      slidesPerView={4}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        996: {
          slidesPerView: 1,
        },
        1200: {
          slidesPerView: 4,
        },
      }}
      className={cx("nav-menu")}
    >
      {menu.map((nav, index) => {
        return (
          <SwiperSlide key={index}>
            <Button
              to={nav.href}
              className={cx("nav-link", url.includes(nav.href) ? "active" : "")}
            >
              {nav.label}
            </Button>
          </SwiperSlide>
        );
      })}
    </Slider>
  );
}

HeaderMenu.propTypes = {
  cx: PropTypes.func.isRequired,
  menu: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
};

HeaderMenu.defaultProps = {
  menu: [],
};

export default memo(HeaderMenu);
