import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";

import { conveniences } from "constants/LoginLayout.constant";
import { Footer, Header } from "layouts/components";
import styles from "./LoginLayout.module.scss";

const cx = classNames.bind(styles);

function LoginLayout({ children }) {
  return (
    <>
      <Header />
      <main className={cx("content", "skip-header")}>
        <Container>
          <Row>
            <Col lg={8}>
              <Row className={cx("conveniences")}>
                {conveniences.map((convenience, index) => (
                  <Col xs={6} key={index} className={cx("convenience-wrapper")}>
                    <div className={cx("convenience")}>
                      <div className={cx("icon")}>
                        <img src={convenience.icon} alt="Icon" />
                      </div>
                      <div className={cx("text")}>
                        <strong>{convenience.mainText}</strong>
                        <span>{convenience.subText}</span>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col lg={4}>{children}</Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </>
  );
}

LoginLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.node.isRequired,
  ]).isRequired,
};

export default LoginLayout;
