import classNames from "classnames/bind";
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";

import {
  cat1,
  cat10,
  cat2,
  cat3,
  cat4,
  cat5,
  cat6,
  cat7,
  cat8,
  cat9,
  monster1,
  monster10,
  monster2,
  monster3,
  monster4,
  monster5,
  monster6,
  monster7,
  monster8,
  monster9,
  robot1,
  robot10,
  robot2,
  robot3,
  robot4,
  robot5,
  robot6,
  robot7,
  robot8,
  robot9,
  robotHead1,
  robotHead10,
  robotHead2,
  robotHead3,
  robotHead4,
  robotHead5,
  robotHead6,
  robotHead7,
  robotHead8,
  robotHead9,
} from "assets/images";
import { Image } from "components";
import styles from "../styles/AvatarBox.module.scss";

const cx = classNames.bind(styles);

function AvatarBox({ value, handleOnChange }) {
  const avatars = [
    robot1,
    robot2,
    robot3,
    robot4,
    robot5,
    robot6,
    robot7,
    robot8,
    robot9,
    robot10,

    robotHead1,
    robotHead2,
    robotHead3,
    robotHead4,
    robotHead5,
    robotHead6,
    robotHead7,
    robotHead8,
    robotHead9,
    robotHead10,

    monster1,
    monster2,
    monster3,
    monster4,
    monster5,
    monster6,
    monster7,
    monster8,
    monster9,
    monster10,

    cat1,
    cat2,
    cat3,
    cat4,
    cat5,
    cat6,
    cat7,
    cat8,
    cat9,
    cat10,
  ];
  return (
    <div className={cx("avatars-container")}>
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
    </div>
  );
}

AvatarBox.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default AvatarBox;
