/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Navigation, Scrollbar, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "components";
import { ReactComponent as InventoryBooksLogo } from "../assets/images/inventory-books-logo.svg";
import styles from "../assets/styles/BookshelfHeader.module.scss";

const cx = classNames.bind(styles);

function BookshelfHeader() {
  const menu = [
    { href: "/bookshelf/follow", label: "Theo dõi" },
    { href: "/bookshelf/history", label: "Lịch sử xem" },
    { href: "/bookshelf/transaction?tab=purchased-titles", label: "Mua" },
    { href: "/bookshelf/transaction?tab=purchased-titles", label: "Thuê/Mua" },
  ];
  const pathName = useLocation().pathname;

  return (
    <div className={cx("wrapper")}>
      <Container className={cx("header")}>
        <div className={cx("header__title")}>
          <InventoryBooksLogo className={cx("header__title__image")} />
          <span className={cx("header__title__label")}>Tủ sách của bạn</span>
        </div>
        {/* REMOVE: <div className={cx("header__navbar")}>
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
        </div> */}
        <Swiper
          modules={[Thumbs]}
          breakpoints={{
            100: {
              slidesPerView: 1.6,
            },
            540: {
              slidesPerView: 2.2,
            },
            768: {
              slidesPerView: 3.8,
            },
          }}
          grabCursor
        >
          <Row className={cx("header__navbar")}>
            {menu.map((item, index) => {
              return (
                <SwiperSlide key={index} className={cx("header__navbar__link")}>
                  <Button
                    wrapper
                    to={item.href}
                    className={cx(
                      "label",
                      pathName.includes(item.href) ? "active" : ""
                    )}
                  >
                    {item.label}
                  </Button>
                </SwiperSlide>
              );
            })}
          </Row>
        </Swiper>
      </Container>
    </div>
  );
}

export default BookshelfHeader;
