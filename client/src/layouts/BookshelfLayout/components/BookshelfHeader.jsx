import classNames from "classnames/bind";
import { Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as InventoryBooksLogo } from "../assets/images/inventory-books-logo.svg";
import styles from "../assets/styles/BookshelfHeader.module.scss";

const cx = classNames.bind(styles);

function BookshelfHeader() {
  const menu = [
    { href: "/bookshelf/follow", label: "Theo dõi" },
    { href: "/bookshelf/history", label: "Lịch sử xem" },
    { href: "/bookshelf/transaction?tab=purchased-titles", label: "Mua" },
    // { href: "/bookshelf/transaction?tab=purchased-titles", label: "Thuê/Mua" },
  ];
  const pathName = useLocation().pathname;

  return (
    <div className={cx("wrapper")}>
      <Container className={cx("header")}>
        <div className={cx("header__title")}>
          <InventoryBooksLogo className={cx("header__title__image")} />
          <span className={cx("header__title__label")}>Tủ sách của bạn</span>
        </div>
        <div className={cx("header__navbar")}>
          {menu.map((link) => {
            return (
              <Link
                to={link.href}
                className={cx(
                  "header__navbar__link",
                  link.href.includes(pathName) ? "active" : ""
                )}
                key={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default BookshelfHeader;
