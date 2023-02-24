import { Box } from "@mui/material";
import classNames from "classnames/bind";

import { leftMouse, middleMouse } from "assets/images";
import styles from "../styles/TablePopup.module.scss";

const cx = classNames.bind(styles);

const readyToUseKeys = [
  {
    key: (
      <>
        <span className={cx("key")}>shift </span>
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
        <span className={cx("key")}>ctrl/shift</span>
        <span className={cx("key-separator")}>+</span>
        <span className={cx("key")}>
          <img src={leftMouse} alt="left click" className={cx("mouse")} /> tiêu đề cột
        </span>
      </>
    ),
    explain: "Sắp xếp nhiều cột",
  },
  {
    key: (
      <>
        <span className={cx("key")}>ctrl</span>
        <span className={cx("key-separator")}>+</span>
        <span className={cx("key")}>
          <img src={leftMouse} alt="left click" className={cx("mouse")} />
        </span>
      </>
    ),
    explain: "Hủy dòng được chọn",
  },
];

const possibleKeys = [
  {
    key: (
      <span className={cx("key")}>
        Nhấp đúp <img src={leftMouse} alt="left click" className={cx("mouse")} />
      </span>
    ),
    explain: "Chỉnh sửa dữ liệu trực tiếp",
    sub: "Nhấn chuột bên ngoài bảng để lưu",
  },
];

function TablePopup() {
  const renderGuide = (data) => {
    return data.map((item, index) => (
      <div className={cx("wrapper")} key={index}>
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
      <Box>
        <h6>Sẵn dùng</h6>
        {renderGuide(readyToUseKeys)}
      </Box>
      <Box>
        <h6>Nếu khả thi</h6>
        {renderGuide(possibleKeys)}
      </Box>
    </Box>
  );
}

export default TablePopup;
