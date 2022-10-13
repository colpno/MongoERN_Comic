import PropTypes from "prop-types";
import classNames from "classnames/bind";

import { Logo } from "assets/images";
import { Button, Image } from "components";
import styles from "./SideBar.module.scss";

const cx = classNames.bind(styles);

function SideBar({ menu }) {
  return (
    <nav className={cx("sidebar-menu")}>
      <Button to="sanpham" className={cx("brand")}>
        <Image src={Logo} alt="Logo" />
      </Button>
      <ul className={cx("sidebar-menu__list")}>
        {menu.map((item) => (
          <li>
            <Button to={item.to} className={cx("sidebar-menu__item")}>
              <i className={item.icon} />
              <span>{item.label}</span>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

SideBar.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      href: PropTypes.string,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
    }).isRequired
  ).isRequired,
};

export default SideBar;
