import classNames from "classnames/bind";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

import { guessAvatar } from "assets/images";
import Button from "components/Button";
import { useClickOutSide } from "hooks";
import styles from "../assets/styles/Avatar.module.scss";
import getAvatarMenu from "../utils/getAvatarMenu";
import AvatarDropdownList from "./AvatarDropdownList";

const cx = classNames.bind(styles);

function Avatar() {
  const [showMenu, setShowMenu] = useState(false);
  const avatarRef = useClickOutSide(showMenu, () => setShowMenu(false));
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState({
    avatar: guessAvatar,
    userName: "Đăng nhập",
    role: "",
    point: 0,
    coin: 0,
  });
  const isLoggedIn = false;
  const menu = getAvatarMenu(cx, user, isLoggedIn);

  return (
    <div className={cx("dropdown-avatar")} ref={avatarRef}>
      <Button
        text
        className={cx("avatar", showMenu && "active")}
        onClick={() => (showMenu ? setShowMenu(false) : setShowMenu(true))}
      >
        <img
          src={user.avatar}
          alt="User avatar"
          className={cx("avatar__icon")}
        />
        <span className={cx("avatar__name")}>Đăng nhập</span>
        <BiChevronDown className={cx("avatar__chevron-icon")} />
      </Button>

      {showMenu && (
        <AvatarDropdownList cx={cx} isLoggedIn={isLoggedIn} menu={menu} />
      )}
    </div>
  );
}

Avatar.propTypes = {};

export default Avatar;
