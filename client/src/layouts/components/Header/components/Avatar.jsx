import classNames from "classnames/bind";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useSelector } from "react-redux";

import { robotHead1 } from "assets/images/index.js";
import { Button, Image, Popper } from "components";
import { useClickOutSide, useLazyLogout } from "hooks";
import styles from "../styles/Avatar.module.scss";
import getAvatarMenu from "../utils/getAvatarMenu";
import AvatarDropdownList from "./AvatarDropdownList";

const cx = classNames.bind(styles);

function Avatar() {
  const { logout } = useLazyLogout();
  const [showMenu, setShowMenu] = useState(false);
  const avatarRef = useClickOutSide(showMenu, () => setShowMenu(false));
  const user = useSelector((state) => state.user.user);
  const isLoggingIn = useSelector((state) => state.user.isLoggingIn);
  const menu = getAvatarMenu(cx, user, isLoggingIn);

  return (
    <div className={cx("avatar-wrapper")} ref={avatarRef}>
      <Popper
        width="300px"
        position="bottom-right"
        placeholder={
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
              handleError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = robotHead1;
              }}
            />
            <span className={cx("avatar__name")}>{user.username}</span>
            <BiChevronDown className={cx("avatar__chevron-icon")} />
          </Button>
        }
        content={
          <AvatarDropdownList
            cx={cx}
            isLoggingIn={isLoggingIn}
            menu={menu}
            logoutClick={logout}
            setShowDropDown={setShowMenu}
          />
        }
        contentVisible={showMenu}
      />
    </div>
  );
}

export default Avatar;
