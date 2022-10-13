import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./GridTable.module.scss";

const cx = classNames.bind(styles);

function GridTable({ head, children }) {
  return (
    <Container className={cx("grid-table")}>
      <Row className={cx("grid-table__head")}>
        {head.map((item, index) => {
          return (
            <Col
              sm={item.sm}
              md={item.md}
              lg={item.lg}
              xl={item.xl}
              xxl={item.xxl}
              key={index}
              className={item.center && "center"}
            >
              {item.label}
            </Col>
          );
        })}
      </Row>
      {children}
    </Container>
  );
}

GridTable.propTypes = {
  head: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      sm: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      md: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      lg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      xl: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      xxl: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      center: PropTypes.bool,
    }).isRequired
  ),
  children: PropTypes.node.isRequired,
};

GridTable.defaultProps = {
  head: [
    {
      sm: "auto",
      md: "auto",
      lg: "auto",
      xl: "auto",
      xxl: "auto",
      center: false,
    },
  ],
};

export default memo(GridTable);
