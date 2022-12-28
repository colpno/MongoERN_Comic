import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";
import { Container } from "react-bootstrap";

import { Button } from "components";
import { DAYS_OF_WEEK } from "constants/time.constant";
import styles from "../assets/styles/DaysOfWeek.module.scss";

const cx = classNames.bind(styles);

function DaysOfWeek({ handleDayClick, date }) {
  return (
    <Container className={cx("weekly-page__content")}>
      {DAYS_OF_WEEK.map((day) => {
        return (
          <Button
            className={cx(
              "day",
              day.shortLabel === date.day && "active",
              day.number === date.today && "today"
            )}
            onClick={() => handleDayClick(day.shortLabel)}
            key={day.number}
          >
            <span className={cx("short-version")}>{day.shortLabel}</span>
            <span className={cx("full-version")}>{day.label}</span>
          </Button>
        );
      })}
    </Container>
  );
}

DaysOfWeek.propTypes = {
  handleDayClick: PropTypes.func,
  date: PropTypes.shape({
    day: PropTypes.string.isRequired,
    today: PropTypes.number.isRequired,
  }),
};

DaysOfWeek.defaultProps = {
  handleDayClick: () => {},
  date: {},
};

export default memo(DaysOfWeek);
