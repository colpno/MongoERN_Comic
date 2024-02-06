import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";

import { Button, Image, Scrollbar } from "components";
import { Dialog } from "features/index.jsx";
import { avatars } from "utils/constants.js";
import styles from "../styles/AvatarBox.module.scss";

const cx = classNames.bind(styles);

function AvatarBox({ value, handleOnChange, trigger }) {
  const handleClose = () => {
    trigger(false);
  };

  return (
    <Dialog handleClickOutside={handleClose}>
      <div className={cx("avatars-container")}>
        <div className={cx("title")}>
          <h6>Hộp ảnh đại diện</h6>
        </div>
        <Scrollbar yAxis className={cx("content")}>
          {avatars.map((avatar, index) => {
            const alt = avatar.slice(avatar.lastIndexOf("/") + 1, avatar.indexOf("."));

            return (
              <Col sm={20} key={index}>
                <input
                  name="avatar"
                  onChange={handleOnChange}
                  type="radio"
                  value={avatar}
                  className={cx("radio")}
                />
                <Image
                  src={avatar}
                  alt={`Avatar ${alt}`}
                  width={70}
                  height={70}
                  className={cx("avatar", value === avatar ? "active" : "")}
                />
              </Col>
            );
          })}
        </Scrollbar>
        <div className={cx("button-group")}>
          <Button primary onClick={handleClose}>
            Đóng
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

AvatarBox.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  trigger: PropTypes.func.isRequired,
};

export default AvatarBox;
