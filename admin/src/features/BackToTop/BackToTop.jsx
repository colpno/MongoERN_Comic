import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BiChevronsUp } from "react-icons/bi";
import classNames from "classnames/bind";

import { Button } from "components";
import styles from "./BackToTop.module.scss";

const cx = classNames.bind(styles);

function BackToTop({ height }) {
  const [showToTop, setShowToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowToTop(window.scrollY >= height);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const backToTop = (e) => {
    e.preventDefault();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

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
