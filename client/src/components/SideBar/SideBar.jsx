import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";

import { Scrollbar } from "components";
import GroupStructure from "./components/GroupStructure";
import NonGroupStructure from "./components/NonGroupStructure";
import styles from "./SideBar.module.scss";

const cx = classNames.bind(styles);

function SideBar({ menu, defaultTab }) {
  const [currentTab, setCurrentTab] = useState(defaultTab);

  return (
    <Scrollbar>
      <ul className={cx("tabs")}>
        {menu.map((group, index) => {
          return (
            <li className={cx("tab-wrapper")} key={index}>
              {group.subMenu ? (
                <GroupStructure
                  cx={cx}
                  group={group}
                  currentTab={currentTab}
                  setCurrentTab={setCurrentTab}
                />
              ) : (
                <NonGroupStructure
                  cx={cx}
                  group={group}
                  currentTab={currentTab}
                  setCurrentTab={setCurrentTab}
                />
              )}
            </li>
          );
        })}
      </ul>
    </Scrollbar>
  );
}

SideBar.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        to: PropTypes.string.isRequired,
        href: PropTypes.string,
        label: PropTypes.string.isRequired,
        icon: PropTypes.shape({}).isRequired,
      }).isRequired,
      PropTypes.shape({
        groupLabel: PropTypes.string.isRequired,
        subMenu: PropTypes.arrayOf(
          PropTypes.shape({
            to: PropTypes.string.isRequired,
            href: PropTypes.string,
            label: PropTypes.string.isRequired,
            icon: PropTypes.shape({}).isRequired,
          }).isRequired
        ).isRequired,
      }).isRequired,
    ]).isRequired
  ).isRequired,
  defaultTab: PropTypes.string.isRequired,
};

export default SideBar;
