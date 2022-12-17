import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import { Logo } from "assets/images";
import { Button } from "components";
import { headerMenu } from "constants/header.constant";
import { Slider } from "features";
import styles from "layouts/components/Header/assets/styles/Header.module.scss";
import Avatar from "./components/Avatar";
import Search from "./components/Search";

const cx = classNames.bind(styles);

function Header({ toggleMobileNavbar, menu }) {
  const url = useLocation().pathname;
  if (menu === null) {
    menu = headerMenu;
  }

  return (
    <header className={cx("header")}>
      <Container fluid="md">
        <div className={cx("desktop-screen")}>
          <div className={cx("logo")}>
            <Button wrapper to="/">
              <Logo className={cx("logo")} />
            </Button>
          </div>
          <Button className={cx("sub-navbar--toggle")}>
            <FaBars onClick={toggleMobileNavbar} />
          </Button>
          <Slider
            outsideNavigation
            grabCursor
            slidesPerView={8}
            breakpoints={{
              0: { slidesPerView: 1 },
              996: { slidesPerView: 5 },
              1200: { slidesPerView: 8 },
            }}
            className={cx("nav-menu")}
          >
            {headerMenu.map((nav, index) => {
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
  );
}

Header.propTypes = {
  toggleMobileNavbar: PropTypes.func,
  menu: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
};

Header.defaultProps = {
  toggleMobileNavbar: () => {},
  menu: null,
};

export default Header;
