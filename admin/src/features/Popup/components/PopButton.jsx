import PropTypes from "prop-types";

import { Button } from "components";
import PopConfirm from "./PopConfirm";

function PopButton({ type, onConfirm, onCancel }) {
  if (type === "confirm") {
    return <PopConfirm onConfirm={onConfirm} onCancel={onCancel} />;
  }

  return (
    <Button primary onClick={onCancel}>
      Đóng
    </Button>
  );
}

PopButton.propTypes = {
  type: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

PopButton.defaultProps = {
  type: "normal",
};

export default PopButton;
