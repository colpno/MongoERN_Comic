import { Col, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import "./assets/styles/SubNavigator.scss";

function SubNavigator({ menu }) {
  const url = useLocation().pathname;

  return (
    <div className="sub-navbar">
      <Container className="navigators">
        <Row>
          {menu.map((item) => {
            return (
              <Col
                key={item.href}
                className={`navigator ${item.href === url ? "active" : ""}`}
              >
                <Link to={item.href} className="navigator__label">
                  {item.label}
                </Link>
              </Col>
            );
          })}
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
