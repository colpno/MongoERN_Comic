import PropTypes from "prop-types";

import AvatarDropdownItem from "./AvatarDropdownItem";

function AvatarDropdownGroup({ cx, menu, onClick, setShowDropDown }) {
  return (
    <>
      {menu.map((group, index1) => (
        <div className={cx("dropdown__group")} key={index1}>
          {group.map((item, index2) => {
            const { path, label, icon } = item;

            return (
              <AvatarDropdownItem
                cx={cx}
                path={path}
                icon={icon}
                onClick={onClick}
                key={index2}
                setShowDropDown={setShowDropDown}
              >
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
        path: PropTypes.string,
        label: PropTypes.node.isRequired,
        icon: PropTypes.node.isRequired,
      }).isRequired
    ).isRequired
  ).isRequired,
  onClick: PropTypes.func,
  setShowDropDown: PropTypes.func.isRequired,
};

AvatarDropdownGroup.defaultProps = {
  onClick: () => {},
};

export default AvatarDropdownGroup;
