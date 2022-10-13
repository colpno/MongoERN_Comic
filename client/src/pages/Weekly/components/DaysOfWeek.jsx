import PropTypes from "prop-types";
import { memo } from "react";
import { Container } from "react-bootstrap";

import Button from "components/Button";

function DaysOfWeek({ cx, handleDayClick, date }) {
  const daysOfWeek = [
    { shortLabel: "T2", label: "Thứ Hai", number: 1 },
    { shortLabel: "T3", label: "Thứ Ba", number: 2 },
    { shortLabel: "T4", label: "Thứ Tư", number: 3 },
    { shortLabel: "T5", label: "Thứ Năm", number: 4 },
    { shortLabel: "T6", label: "Thứ Sáu", number: 5 },
    { shortLabel: "T7", label: "Thứ Bảy", number: 6 },
    { shortLabel: "CN", label: "Chủ nhật", number: 0 },
  ];

  return (
    <Container className={cx("weekly-page__content")}>
      {daysOfWeek.map((day) => {
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
            {day.label}
          </Button>
        );
      })}
    </Container>
  );
}

DaysOfWeek.propTypes = {
  cx: PropTypes.func.isRequired,
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
