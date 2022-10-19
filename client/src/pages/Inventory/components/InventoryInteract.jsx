import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
import { BiSort } from "react-icons/bi";

import Button from "components/Button";
import Select from "components/Select";

function InventoryInteract({ cx, handleSort, sortOptions, handleFilter }) {
  return (
    <Col className={cx("inventory__general__options")}>
      <Button
        to="/profile/history/ticket"
        className={cx("inventory__general__options__redirect")}
      >
        Lịch sử nhận vé
      </Button>
      <div className={cx("inventory__general__options__select")}>
        <Button wrapper className={cx("icon")} onClick={handleSort}>
          <BiSort />
        </Button>
        <Select
          options={sortOptions}
          field={{ onChange: handleFilter }}
          height={34}
        />
      </div>
    </Col>
  );
}

InventoryInteract.propTypes = {
  cx: PropTypes.func.isRequired,
  handleSort: PropTypes.func.isRequired,
  sortOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default InventoryInteract;
