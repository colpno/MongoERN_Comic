import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import { Logo } from "assets/images";
import { Button, ToggleableSubNavbar } from "components";
import { HEADER_MENU, MOBILE_NAV_MENU } from "constants/menu.constant";
import { Slider } from "features";
import { toggleHeaderNavBar } from "libs/redux/slices/globalSlice";
import Avatar from "./components/Avatar";
import Search from "./components/Search";
import styles from "./styles/Header.module.scss";

const cx = classNames.bind(styles);

function Header({ menu }) {
  const dispatch = useDispatch();
  const url = useLocation().pathname;
  const isToggleMobileNavBar = useSelector(
    (state) => state.global.toggleHeaderNavBar
  );

  if (menu === null) {
    menu = HEADER_MENU;
  }

  const handleToggleMobileNavBar = () => {
    dispatch(toggleHeaderNavBar(!isToggleMobileNavBar));
  };

  return (
    <>
      <header className={cx("header")}>
        <Container fluid="md">
          <div className={cx("desktop-screen")}>
            <div className={cx("logo")}>
              <Button wrapper to="/">
                <Logo className={cx("logo")} title="Trang chủ" />
              </Button>
            </div>
            <Button className={cx("sub-navbar--toggle")}>
              <FaBars onClick={handleToggleMobileNavBar} />
            </Button>
            <Slider
              outsideNavigation
              grabCursor
              slidesPerView={4}
              breakpoints={{
                0: { slidesPerView: 1 },
                996: { slidesPerView: 1 },
                1200: { slidesPerView: 4 },
              }}
              className={cx("nav-menu")}
            >
              {HEADER_MENU.map((nav, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Button
                      wrapper
                      to={nav.href}
                      className={cx(
                        "nav-link",
                        url.includes(nav.href) ? "active" : ""
                      )}
                    >
                      {nav.label}
                    </Button>
                  </SwiperSlide>
                );
              })}
            </Slider>
            <Search />
            <Avatar />
          </div>
        </Container>
      </header>
      <ToggleableSubNavbar menu={MOBILE_NAV_MENU} />
    </>
  );
}

Header.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
};

Header.defaultProps = {
  menu: null,
};

export default Header;
