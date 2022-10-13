import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";

import { Logo } from "assets/images";
import styles from "layouts/components/Header/assets/styles/Header.module.scss";
import Avatar from "./components/Avatar";
import Search from "./components/Search";

const cx = classNames.bind(styles);

function Header() {
  const headerNavigation = [
    { href: "/comic/weekly", label: "Comics" },
    { href: "/novel", label: "Novels" },
    { href: "/anime", label: "Anime" },
  ];
  const url = useLocation().pathname;

  return (
    <header className={cx("header")}>
      <div className={cx("container")}>
        <div className={cx("desktop-screen")}>
          <div className={cx("logo")}>
            <a href="/">
              <img src={Logo} alt="Logo" />
            </a>
          </div>
          <ul className={cx("nav-menu")}>
            {headerNavigation.map((nav) => {
              return (
                <li key={nav.label}>
                  <a
                    href={nav.href}
                    className={cx(
                      url.includes(nav.href.split("/")[1]) ? "active" : ""
                    )}
                  >
                    {nav.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <Search />
          <Avatar />
        </div>
      </div>
    </header>
  );
}

export default Header;
