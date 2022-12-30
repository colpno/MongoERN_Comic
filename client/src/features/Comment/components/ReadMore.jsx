import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import styles from "../styles/ReadMore.module.scss";

const cx = classNames.bind(styles);

function ReadMore({ expandHeight, children }) {
  const contentRef = useRef(null);
  const [expand, setExpand] = useState({
    contentHeight: "fit-content",
    isExpand: true,
  });

  const handleExpand = () => {
    setExpand({ contentHeight: "fit-content", isExpand: true });
  };

  useEffect(() => {
    const elementHeight = contentRef.current.offsetHeight;

    if (elementHeight > expandHeight) {
      setExpand({ contentHeight: expandHeight, isExpand: false });
    }
  }, [contentRef?.current?.offsetHeight]);

  return (
    <div className={cx("read-more")} ref={contentRef}>
      <div
        className={cx("content")}
        style={{ maxHeight: expand.contentHeight }}
      >
        {children}
      </div>
      {expand.isExpand ? null : (
        <div className={cx("expand")} onClick={handleExpand}>
          Xem thêm
        </div>
      )}
    </div>
  );
}

ReadMore.propTypes = {
  children: PropTypes.node.isRequired,
  expandHeight: PropTypes.number,
};

ReadMore.defaultProps = {
  expandHeight: 90,
};

export default ReadMore;
