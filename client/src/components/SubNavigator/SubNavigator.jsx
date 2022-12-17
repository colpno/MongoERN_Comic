import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import { Button } from "components";
import { Slider } from "features";
import "./assets/styles/SubNavigator.scss";

function SubNavigator({ menu }) {
  const url = useLocation().pathname;

  return (
    <div className="sub-navbar">
      <Container className="navigators">
        <Row>
          <Col>
            <Slider
              grabCursor
              slidesPerView={3}
              outsideNavigation
              className="navigator"
            >
              {menu.map((item, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    className={`navigator__link ${
                      item.href === url ? "active" : ""
                    }`}
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
};

export default SubNavigator;
