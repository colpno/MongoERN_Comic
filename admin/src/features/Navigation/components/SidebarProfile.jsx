import classNames from "classnames/bind";
import { Button } from "components/index";
import { useLazyLogout } from "hooks/index";
import { IoIosLogOut } from "react-icons/io";
import { useSelector } from "react-redux";
import styles from "../styles/Sidebar.module.scss";

const cx = classNames.bind(styles);

function SidebarProfile() {
  const user = useSelector((state) => state.user.user);
  const { logout } = useLazyLogout();

  return (
    <div className={cx("sidebar_profile", "flex")}>
      <Button wrapper to="/profile" className={cx("nav_image")}>
        <img src={user.avatar} alt="logo_img" />
      </Button>
      <div className={cx("data_text")}>
        <Button text to="/profile" className={cx("name")}>
          {user.username}
        </Button>
      </div>
      <Button wrapper onClick={() => logout()} className={cx("logout_btn")}>
        <IoIosLogOut className={cx("logout-icon")} />
      </Button>
    </div>
  );
}

export default SidebarProfile;
