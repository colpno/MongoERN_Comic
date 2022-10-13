import { Logo } from "assets/images";
import classNames from "classnames/bind";
import Button from "components/Button";
import { useEffect, useState } from "react";
import { BiChevronsUp } from "react-icons/bi";
import { ImFacebook2 } from "react-icons/im";
import { Link } from "react-router-dom";
import styles from "./assets/styles/Footer.module.scss";

const cx = classNames.bind(styles);

function Footer() {
  const navigators = [
    { id: 1, href: "/", text: "Điều khoản sử dụng" },
    { id: 2, href: "/", text: "Điều khoản bảo mật" },
  ];
  const [showToTop, setShowToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowToTop(window.scrollY >= 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const backToTop = (e) => {
    e.preventDefault();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

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
        <div className={cx("footer__logo", "logo")}>
          <img src={Logo} alt="Logo" />
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
      <Button
        text
        className={cx("back-to-top", showToTop || "disabled")}
        onClick={backToTop}
      >
        <BiChevronsUp />
      </Button>
    </footer>
  );
}

export default Footer;
