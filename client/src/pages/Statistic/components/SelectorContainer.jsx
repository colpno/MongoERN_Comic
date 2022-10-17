import PropTypes from "prop-types";

import { Select } from "components";

function SelectorContainer({ cx, titleLabel, options, handleChange }) {
  return (
    <div className={cx("selector-container")}>
      <h4>{titleLabel}:</h4>
      <Select
        options={options}
        onChange={handleChange}
        className={cx("title-selector")}
      />
    </div>
  );
}

SelectorContainer.propTypes = {
  cx: PropTypes.func.isRequired,
  titleLabel: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default SelectorContainer;
