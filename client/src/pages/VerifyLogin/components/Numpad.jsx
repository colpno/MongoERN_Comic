import { FaBackspace } from "react-icons/fa";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import { Button } from "components";
import styles from "../styles/Numpad.module.scss";

const cx = classNames.bind(styles);

function Numpad({ handleNumpadClick, handleNumpadClearClick }) {
  return (
    <div className={cx("keyboard", "d-flex", "flex-wrap")}>
      <Button wrapper className={cx("num-1", "num")} data-key="1" onClick={handleNumpadClick}>
        1
      </Button>
      <Button className={cx("num-2", "num")} data-key="2" onClick={handleNumpadClick}>
        2
      </Button>
      <Button className={cx("num-3", "num")} data-key="3" onClick={handleNumpadClick}>
        3
      </Button>
      <Button className={cx("num-4", "num")} data-key="4" onClick={handleNumpadClick}>
        4
      </Button>
      <Button className={cx("num-5", "num")} data-key="5" onClick={handleNumpadClick}>
        5
      </Button>
      <Button className={cx("num-6", "num")} data-key="6" onClick={handleNumpadClick}>
        6
      </Button>
      <Button className={cx("num-7", "num")} data-key="7" onClick={handleNumpadClick}>
        7
      </Button>
      <Button className={cx("num-8", "num")} data-key="8" onClick={handleNumpadClick}>
        8
      </Button>
      <Button className={cx("num-9", "num")} data-key="9" onClick={handleNumpadClick}>
        9
      </Button>
      <span className={cx("num-n", "num")} data-key="n" />
      <Button className={cx("num-0", "num")} data-key="0" onClick={handleNumpadClick}>
        0
      </Button>
      <Button className={cx("remove")} data-key="backspace" onClick={handleNumpadClearClick}>
        <FaBackspace className={cx("icon")} />
      </Button>
    </div>
  );
}

Numpad.propTypes = {
  handleNumpadClick: PropTypes.func.isRequired,
  handleNumpadClearClick: PropTypes.func.isRequired,
};

export default Numpad;
