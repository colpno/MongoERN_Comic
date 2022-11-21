import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import classNames from "classnames/bind";

import styles from "./LoginLayout.module.scss";

const cx = classNames.bind(styles);

function LoginLayout({ children }) {
  return (
    <main className={cx("content")}>
      <Container>
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
    </main>
  );
}

LoginLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.node.isRequired,
  ]).isRequired,
};

export default LoginLayout;
