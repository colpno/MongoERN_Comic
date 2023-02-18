import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import { Button } from "components";
import { Slider } from "features";
import "./SubNavigator.scss";

function SubNavigator({ menu, slidesPerView }) {
  const url = useLocation().pathname;

  return (
    <div className="sub-navbar">
      <Container className="navigators">
        <Row>
          <Col>
            <Slider
              grabCursor
              slidesPerView={slidesPerView}
              outsideNavigation
              className="navigator"
            >
              {menu.map((item, index) => {
                const href = item.href.includes("?")
                  ? item.href.slice(0, item.href.indexOf("?"))
                  : item.href;

                return (
                  <SwiperSlide
                    key={index}
                    className={`navigator__link ${href === url ? "active" : ""}`}
                  >
                    <Button wrapper to={item.href} className="navigator__label">
                      {item.label}
                    </Button>
                  </SwiperSlide>
                );
              })}
            </Slider>
          </Col>
        </Row>
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
  slidesPerView: PropTypes.number,
};

SubNavigator.defaultProps = {
  slidesPerView: 3,
};

export default SubNavigator;
