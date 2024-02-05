import classNames from "classnames/bind";
import { getAdminSideBarMenu } from "utils/constants";
import styles from "../styles/Sidebar.module.scss";
import SidebarMenuGroup from "./SidebarMenuGroup";

const cx = classNames.bind(styles);

function SidebarMenu() {
  const menu = getAdminSideBarMenu();

  return (
    <div className={cx("menu_container")}>
      <div className={cx("menu_items")}>
        {menu.map(({ groupLabel, subMenu }) => (
          <SidebarMenuGroup groupLabel={groupLabel} subMenu={subMenu} key={groupLabel} />
        ))}
      </div>
    </div>
  );
}

export default SidebarMenu;
