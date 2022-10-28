import classNames from "classnames/bind";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Image } from "components";
import Button from "components/Button";
import { useClickOutSide } from "hooks";
import { logout } from "libs/redux/slices/userSlice";
import styles from "../assets/styles/Avatar.module.scss";
import getAvatarMenu from "../utils/getAvatarMenu";
import AvatarDropdownList from "./AvatarDropdownList";

const cx = classNames.bind(styles);

function Avatar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const avatarRef = useClickOutSide(showMenu, () => setShowMenu(false));
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const menu = getAvatarMenu(cx, user, isLoggedIn);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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
        />
        <span className={cx("avatar__name")}>{user.userName}</span>
        <BiChevronDown className={cx("avatar__chevron-icon")} />
      </Button>

      {showMenu && (
        <AvatarDropdownList
          cx={cx}
          isLoggedIn={isLoggedIn}
          menu={menu}
          logoutClick={handleLogout}
        />
      )}
    </div>
  );
}

export default Avatar;
