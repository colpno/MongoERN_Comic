import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

import { Logo } from "assets/images";
import { Button } from "components";
import styles from "layouts/components/Header/assets/styles/Header.module.scss";
import Avatar from "./components/Avatar";
import Search from "./components/Search";

const cx = classNames.bind(styles);

function Header() {
  const headerNavigation = [
    { href: "/comic/weekly", label: "Comic" },
    { href: "/novel", label: "Novel" },
    { href: "/anime", label: "Anime" },
  ];
  const url = useLocation().pathname;

  return (
    <header className={cx("header")}>
      <Container fluid="md">
        <div className={cx("desktop-screen")}>
          <div className={cx("logo")}>
            <Button wrapper to="/">
              <Logo className={cx("logo")} />
            </Button>
          </div>
          <ul className={cx("nav-menu")}>
            {headerNavigation.map((nav) => {
              return (
                <li key={nav.label}>
                  <Button
                    wrapper
                    to={nav.href}
                    className={cx(url.includes(nav.href) ? "active" : "")}
                  >
                    {nav.label}
                  </Button>
                </li>
              );
            })}
          </ul>
          <Search />
          <Avatar />
        </div>
      </Container>
    </header>
  );
}

export default Header;
