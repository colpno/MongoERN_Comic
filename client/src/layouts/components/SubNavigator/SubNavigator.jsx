import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "components";
import "./assets/styles/SubNavigator.scss";

function SubNavigator({ menu, responsive }) {
  const url = useLocation().pathname;

  return (
    <div className="sub-navbar">
      <Container className="navigators">
        {responsive ? (
          <Row className="navigator--default">
            {menu.map((item) => {
              return (
                <Col
                  key={item.href}
                  className={`navigator ${item.href === url ? "active" : ""}`}
                >
                  <Button wrapper to={item.href} className="navigator__label">
                    {item.label}
                  </Button>
                </Col>
              );
            })}
          </Row>
        ) : (
          <Swiper
            breakpoints={{
              100: {
                slidesPerView: 2.6,
              },
              540: {
                slidesPerView: 3.6,
              },
              768: {
                slidesPerView: 4,
              },
            }}
            modules={[Thumbs]}
            grabCursor
            className="navigator"
          >
            <Row>
              {menu.map((item, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    className={item.href === url ? "active" : ""}
                  >
                    <Button wrapper to={item.href} className="navigator__label">
                      {item.label}
                    </Button>
                  </SwiperSlide>
                );
              })}
            </Row>
          </Swiper>
        )}
      </Container>
    </div>
  );
}

SubNavigator.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  responsive: PropTypes.bool,
};

SubNavigator.defaultProps = {
  responsive: false,
};

export default SubNavigator;
