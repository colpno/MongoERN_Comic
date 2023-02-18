import { Box } from "@mui/material";
import classNames from "classnames/bind";

import styles from "../styles/TablePopup.module.scss";

const cx = classNames.bind(styles);

function TablePopup() {
  return (
    <Box width="100%">
      <Box>
        <h6>Khả thi</h6>
        <div className={cx("guide-wrapper")}>
          <span className={cx("key")}>shift + lăn chuột giữa</span>
          <span className={cx("guide")}>Cuộn ngang</span>
        </div>
        <div className={cx("guide-wrapper")}>
          <span className={cx("key")}>ctrl + nhấn chuột trái</span>
          <span className={cx("guide")}>Hủy dòng được chọn</span>
        </div>
      </Box>
      <Box>
        <h6>Tùy bảng</h6>
        <div className={cx("guide-wrapper")}>
          <span className={cx("key")}>Nhấn chuột trái 2 lần</span>
          <span className={cx("guide")}>
            Chỉnh sửa dữ liệu trực tiếp{" "}
            <span className={cx("sub-guide")}>(Nhấn chuột bên ngoài bảng để lưu)</span>
          </span>
        </div>
      </Box>
    </Box>
  );
}

export default TablePopup;
