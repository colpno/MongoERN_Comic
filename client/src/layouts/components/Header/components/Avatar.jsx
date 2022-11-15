import classNames from "classnames/bind";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useSelector } from "react-redux";

import { Image } from "components";
import Button from "components/Button";
import { useClickOutSide, useLogout } from "hooks";
import styles from "../assets/styles/Avatar.module.scss";
import getAvatarMenu from "../utils/getAvatarMenu";
import AvatarDropdownList from "./AvatarDropdownList";

const cx = classNames.bind(styles);

function Avatar() {
  const { logout } = useLogout("/");
  const [showMenu, setShowMenu] = useState(false);
  const avatarRef = useClickOutSide(showMenu, () => setShowMenu(false));
  const user = useSelector((state) => state.user.user);
  const isLoggingIn = useSelector((state) => state.user.isLoggingIn);
  const menu = getAvatarMenu(cx, user, isLoggingIn);

  return (
    <div className={cx("dropdown-avatar")} ref={avatarRef}>
      <Button
        text
        className={cx("avatar", showMenu && "active")}
        onClick={() => (showMenu ? setShowMenu(false) : setShowMenu(true))}
      >
        <Image
          src={user.avatar}
          alt="User avatar"
          className={cx("avatar__icon")}
          width={40}
          height={40}
        />
        <span className={cx("avatar__name")}>{user.username}</span>
        <BiChevronDown className={cx("avatar__chevron-icon")} />
      </Button>

      {showMenu && (
        <AvatarDropdownList
          cx={cx}
          isLoggingIn={isLoggingIn}
          menu={menu}
          logoutClick={logout}
        />
      )}
    </div>
  );
}

export default Avatar;
