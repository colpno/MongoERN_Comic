import { Loading } from "features";
import PropTypes from "prop-types";
import { ProgressBar } from "react-bootstrap";

// eslint-disable-next-line no-unused-vars
function ProgressCircle({ percentage }) {
  return (
    <>
      {percentage > 0 && percentage <= 99 && (
        <ProgressBar striped now={percentage} label={`${percentage}%`} />
      )}
      {percentage > 99 && percentage <= 100 && <Loading />}
    </>
  );
}

ProgressCircle.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default ProgressCircle;
