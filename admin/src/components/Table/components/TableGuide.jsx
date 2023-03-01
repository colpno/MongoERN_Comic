import { Box } from "@mui/material";
import classNames from "classnames/bind";

import { leftMouse, middleMouse } from "assets/images";
import styles from "../styles/TableGuide.module.scss";

const cx = classNames.bind(styles);

const readyToUseKeys = [
  {
    key: (
      <>
        <span className={cx("key")}>shift</span>
        <span className={cx("key-separator")}>+</span>
        <span className={cx("key")}>
          cuộn <img src={middleMouse} alt="middle click" className={cx("mouse")} />
        </span>
      </>
    ),
    explain: "Cuộn ngang",
  },
  {
    key: (
      <>
        <span className={cx("key")}>
          <img src={leftMouse} alt="left click" className={cx("mouse")} /> và giữ
        </span>{" "}
        tiêu đề cột
        <span className={cx("key-separator")}>+</span>
        di chuyển trái/phải
      </>
    ),
    explain: "Thay đổi vị trí cột",
  },
  {
    key: (
      <>
        <span className={cx("key")}>
          <img src={leftMouse} alt="left click" className={cx("mouse")} /> và giữ
        </span>{" "}
        tại đường phân cách tiêu đề cột
      </>
    ),
    explain: "Thay đổi kích thước cột",
  },
  {
    key: (
      <>
        <span className={cx("key")}>ctrl/shift</span>
        <span className={cx("key-separator")}>+</span>
        <span className={cx("key")}>
          <img src={leftMouse} alt="left click" className={cx("mouse")} />
        </span>{" "}
        tiêu đề cột
      </>
    ),
    explain: "Sắp xếp nhiều cột",
  },
];

function TableGuide() {
  const renderGuide = (data) => {
    return data.map((item, index) => (
      <div className={cx("guide-container")} key={index}>
        <p className={cx("guide")}>{item.key}</p>
        <p className={cx("explain")}>
          {item.explain}
          {item.sub && <span className={cx("sub-explain")}>({item.sub})</span>}
        </p>
      </div>
    ));
  };

  return (
    <Box width="100%">
      <Box className={cx("wrapper")}>{renderGuide(readyToUseKeys)}</Box>
    </Box>
  );
}

export default TableGuide;
