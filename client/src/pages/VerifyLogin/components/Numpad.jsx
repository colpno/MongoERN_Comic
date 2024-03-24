import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { FaBackspace } from "react-icons/fa";

import { Button } from "components";
import { memo } from "react";
import styles from "../styles/Numpad.module.scss";

const cx = classNames.bind(styles);

function Numpad({ currentDigit, setOTPValue }) {
  const handleNumpadClick = (e) => {
    const { target } = e;

    // the number present to the pressed key
    const number = target.getAttribute("data-key");

    // digit position
    const digit = currentDigit.getAttribute("data-digit");

    setOTPValue((prev) => ({
      ...prev,
      [`digit${digit}`]: number,
    }));

    const nextSibling = currentDigit.nextElementSibling;

    // if current focus ele has next sibling
    if (nextSibling) {
      // move focus to that one
      nextSibling.focus();
    } else {
      // else still focus on current one (reach end)
      currentDigit.focus();
    }
  };

  const handleClearNumpad = () => {
    const digit = currentDigit.getAttribute("data-digit");

    // if current focus ele has value
    if (currentDigit.value !== "") {
      // remove its value
      setOTPValue((prev) => ({
        ...prev,
        [`digit${digit}`]: "",
      }));

      currentDigit.focus();
    }

    // if current focus ele empty
    if (currentDigit.value === "") {
      const prevSibling = currentDigit.previousElementSibling;

      // and has previous sibling
      if (prevSibling) {
        // remove its value
        setOTPValue((prev) => ({
          ...prev,
          [`digit${digit - 1}`]: "",
        }));

        // focus to the previous sibling
        prevSibling.focus();
      }

      // if reach beginning
      if (!prevSibling) {
        // always focus on the first one
        currentDigit.focus();
      }
    }
  };

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
      <Button className={cx("remove")} data-key="backspace" onClick={handleClearNumpad}>
        <FaBackspace className={cx("icon")} />
      </Button>
    </div>
  );
}

Numpad.propTypes = {
  currentDigit: PropTypes.shape({
    getAttribute: PropTypes.func,
    nextElementSibling: PropTypes.shape({
      focus: PropTypes.func,
    }),
    previousElementSibling: PropTypes.shape({
      focus: PropTypes.func,
    }),
    focus: PropTypes.func,
    value: PropTypes.string,
  }),
  setOTPValue: PropTypes.func.isRequired,
};

Numpad.defaultProps = {
  currentDigit: null,
};

export default memo(Numpad);
