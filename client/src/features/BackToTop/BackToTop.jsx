import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { BiChevronsUp } from "react-icons/bi";

import { Button } from "components";
import useScrollToTop from "hooks/useScrollToTop.jsx";
import styles from "./BackToTop.module.scss";

const cx = classNames.bind(styles);

function BackToTop({ height }) {
  const { backToTop, showToTop } = useScrollToTop(height);

  return (
    <Button text className={cx("back-to-top", showToTop || "disabled")} onClick={backToTop}>
      <BiChevronsUp />
    </Button>
  );
}

BackToTop.propTypes = {
  height: PropTypes.number,
};

BackToTop.defaultProps = {
  height: 200,
};

export default BackToTop;
