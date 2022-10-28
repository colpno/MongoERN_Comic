import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { FaSort } from "react-icons/fa";

import { Button } from "components";
import styles from "./GridTable.module.scss";

const cx = classNames.bind(styles);

function GridTable({ head, children, border, sorting }) {
  const classes = cx("grid-table", { border });

  return (
    <Row className={classes}>
      {head.length > 0 && (
        <Row className={cx("grid-table__head")}>
          {head.map((item, index) => {
            const { label, name, center, sm, md, lg, xl, xxl } = item;

            return (
              <Col
                sm={sm}
                md={md}
                lg={lg}
                xl={xl}
                xxl={xxl}
                key={index}
                className={center && "center"}
                onClick={() => name && sorting(name)}
              >
                {name ? (
                  <Button text className={cx("wrapper--sort")}>
                    <span className={cx("label")}>{label}</span>
                    <FaSort className={cx("sort-icon")} />
                  </Button>
                ) : (
                  <span>{label}</span>
                )}
              </Col>
            );
          })}
        </Row>
      )}
      {children}
    </Row>
  );
}

GridTable.propTypes = {
  head: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string,
      sm: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      md: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      lg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      xl: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      xxl: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      center: PropTypes.bool,
    }).isRequired
  ),
  children: PropTypes.node.isRequired,
  sorting: PropTypes.func,

  border: PropTypes.bool,
};

GridTable.defaultProps = {
  head: [],
  sorting: () => {},

  border: true,
};

export default memo(GridTable);
