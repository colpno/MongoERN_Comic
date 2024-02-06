import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "../styles/Sidebar.module.scss";
import SidebarMenuGroupItem from "./SidebarMenuGroupItem";

const cx = classNames.bind(styles);

function SidebarMenuGroup({ groupLabel, subMenu }) {
  return (
    <ul className={cx("menu_item")} key={groupLabel}>
      <div className={cx("menu_title", "flex")}>
        <span className={cx("title")}>{groupLabel}</span>
        <span className={cx("line")} />
      </div>
      {subMenu.map((menu) => (
        <SidebarMenuGroupItem {...menu} key={`${menu.to}-${menu.label}`} />
      ))}
    </ul>
  );
}

SidebarMenuGroup.propTypes = {
  groupLabel: PropTypes.string.isRequired,
  subMenu: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default SidebarMenuGroup;
