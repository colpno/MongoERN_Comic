import React, { Fragment } from "react";
import PropTypes from "prop-types";
import AvatarDropdownItem from "./AvatarDropdownItem";

function AvatarDropdownGroup({ cx, menu }) {
  return (
    <>
      {menu.map((group, index1) => (
        <div className={cx("dropdown__group")} key={index1}>
          {group.map((item, index2) => {
            const { path, label, icon } = item;

            return (
              <AvatarDropdownItem cx={cx} path={path} icon={icon} key={index2}>
                <span className={cx("label")}>{label}</span>
              </AvatarDropdownItem>
            );
          })}
        </div>
      ))}
      {}
    </>
  );
}

AvatarDropdownGroup.propTypes = {
  cx: PropTypes.func.isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        label: PropTypes.node.isRequired,
        icon: PropTypes.node.isRequired,
      }).isRequired
    ).isRequired
  ).isRequired,
};

export default AvatarDropdownGroup;
