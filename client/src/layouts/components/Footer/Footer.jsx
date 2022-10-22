import classNames from "classnames/bind";
import { ImFacebook2 } from "react-icons/im";
import { Link } from "react-router-dom";

import { Logo } from "assets/images";
import { BackToTop } from "features";
import styles from "./assets/styles/Footer.module.scss";

const cx = classNames.bind(styles);

function Footer() {
  const navigators = [
    { id: 1, href: "/", text: "Điều khoản sử dụng" },
    { id: 2, href: "/", text: "Điều khoản bảo mật" },
  ];

  return (
    <footer className={cx("footer")}>
      <div className={cx("container")}>
        <nav className={cx("footer__nav-menu")}>
          <ul>
            {navigators.map((nav) => {
              return (
                <li key={nav.id}>
                  <Link to={nav.href}>{nav.text}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className={cx("footer__logo")}>
          <Logo className={cx("logo")} />
        </div>
        <address className={cx("footer__address")}>
          <p>
            Floor 139, Block A, A Tower, 99999 Dien Bien Phu Street,
            <br />
            Dakao Ward, District 1, Ho Chi Minh City.
          </p>
        </address>
        <div className={cx("divider")} />
        <div className={cx("footer__contact")}>
          <span>Support: help@mail.domain</span>
          <span>Business: business@mail.domain</span>
        </div>
        <div className={cx("footer__social-media")}>
          <Link to="/">
            <ImFacebook2 />
          </Link>
        </div>
      </div>
      <p className={cx("footer__copyright")}>Copyright. All rights reserved.</p>
      <BackToTop />
    </footer>
  );
}

export default Footer;
