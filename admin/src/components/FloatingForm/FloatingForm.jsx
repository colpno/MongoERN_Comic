import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import styles from "./FloatingForm.module.scss";

const cx = classNames.bind(styles);

function FloatingForm({ title, children }) {
  return (
    <Container>
      <Row>
        <Col>
          <FloatingContainer className={cx("wrapper")}>
            <h3>{title}</h3>
            {children}
          </FloatingContainer>
        </Col>
      </Row>
    </Container>
  );
}

FloatingForm.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default FloatingForm;
