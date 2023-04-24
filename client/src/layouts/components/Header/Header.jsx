import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";
import { Container, Row } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { Logo } from "assets/images";
import { Button, ToggleableSubNavbar } from "components";
import { HEADER_MENU, MOBILE_NAV_MENU } from "constants/menu.constant";
import { toggleHeaderNavBar } from "libs/redux/slices/global.slice";
import Avatar from "./components/Avatar";
import HeaderMenu from "./components/HeaderMenu";
import Search from "./components/Search";
import styles from "./styles/Header.module.scss";

const cx = classNames.bind(styles);

function Header({ menu }) {
  const dispatch = useDispatch();
  const isMobileNavBarToggle = useSelector((state) => state.global.toggleHeaderNavBar);

  const handleToggleMobileNavBar = () => {
    dispatch(toggleHeaderNavBar(!isMobileNavBarToggle));
  };

  return (
    <>
      <header className={cx("header")}>
        <Container fluid="md">
          <Row className={cx("desktop-screen")}>
            <div className={cx("logo")}>
              <Button wrapper to="/">
                <Logo className={cx("logo")} title="Trang chủ" />
              </Button>
            </div>
            <Button className={cx("sub-navbar--toggle")}>
              <FaBars onClick={handleToggleMobileNavBar} />
            </Button>
            <HeaderMenu cx={cx} menu={menu} />
            <Search />
            <Avatar />
          </Row>
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
  menu: HEADER_MENU,
};

export default memo(Header);
