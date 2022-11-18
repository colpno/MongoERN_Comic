import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "components";
import Footer from "layouts/components/Footer";
import Header from "layouts/components/Header";
import { useLocation } from "react-router-dom";
import styles from "./DefaultLayout.module.scss";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const headerNavigation = [
    { href: "/", label: "Trang chủ" },
    { href: "/comic/weekly", label: "Hàng tuần" },
    { href: "/comic/ranking", label: "Xếp hạng" },
    { href: "/comic/complete", label: "Truyện hoàn thành" },
  ];
  const url = useLocation().pathname;

  return (
    <>
      <Header />
      <div className="content skip-header">
        <Swiper
          breakpoints={{
            100: {
              slidesPerView: 2.2,
            },
            540: {
              slidesPerView: 3.2,
            },
            768: {
              slidesPerView: 4,
            },
          }}
          modules={[Thumbs]}
          grabCursor
          className={cx("navigator")}
        >
          {headerNavigation.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className={cx(item.href === url ? "active" : "")}
              >
                <Button
                  wrapper
                  to={item.href}
                  className={cx("navigator__label")}
                >
                  {item.label}
                </Button>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {children}
      </div>
      <Footer />
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
