import classNames from "classnames/bind";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import { Button } from "components";
import { BOOKSHELF_MENU } from "constants/menu.constant";
import { Slider } from "features";
import { ReactComponent as InventoryBooksLogo } from "../assets/images/inventory-books-logo.svg";
import styles from "../assets/styles/BookshelfHeader.module.scss";

const cx = classNames.bind(styles);

function BookshelfHeader() {
  const pathName = useLocation().pathname;

  return (
    <div className={cx("wrapper")}>
      <Container className={cx("header")}>
        <div className={cx("header__title")}>
          <InventoryBooksLogo className={cx("header__title__image")} />
          <span className={cx("header__title__label")}>Tủ sách của bạn</span>
        </div>
        <Slider
          grabCursor
          outsideNavigation
          slidesPerView={3}
          breakpoints={{
            0: { slidesPerView: 1 },
            996: { slidesPerView: 3 },
          }}
          className={cx("header__navbar")}
        >
          {BOOKSHELF_MENU.map((item, index) => {
            return (
              <SwiperSlide key={index} className={cx("header__navbar__link")}>
                <Button
                  wrapper
                  to={item.href}
                  className={cx("label", pathName.includes(item.href) ? "active" : "")}
                >
                  {item.label}
                </Button>
              </SwiperSlide>
            );
          })}
        </Slider>
      </Container>
    </div>
  );
}

export default BookshelfHeader;
