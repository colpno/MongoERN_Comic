import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import GroupStructure from "./components/GroupStructure";
import NonGroupStructure from "./components/NonGroupStructure";
import styles from "./SideBar.module.scss";

const cx = classNames.bind(styles);

function SideBar({ menu }) {
  const isToggle = useSelector((state) => state.global.isSideBarToggled);

  return (
    <ul className={cx("tabs")}>
      {menu.map((group, index) => {
        return (
          <li className={cx("tab-wrapper")} key={index}>
            {group.subMenu ? (
              <GroupStructure cx={cx} group={group} isToggle={isToggle} />
            ) : (
              <NonGroupStructure cx={cx} group={group} isToggle={isToggle} />
            )}
          </li>
        );
      })}
    </ul>
  );
}

SideBar.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        to: PropTypes.string,
        href: PropTypes.string,
        label: PropTypes.string.isRequired,
        icon: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]).isRequired,
      }).isRequired,
      PropTypes.shape({
        groupLabel: PropTypes.string.isRequired,
        subMenu: PropTypes.arrayOf(
          PropTypes.shape({
            to: PropTypes.string,
            href: PropTypes.string,
            label: PropTypes.string.isRequired,
            icon: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]).isRequired,
          }).isRequired
        ).isRequired,
      }).isRequired,
    ]).isRequired
  ).isRequired,
};

export default SideBar;
