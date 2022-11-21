import classNames from "classnames/bind";
import { setSearchText } from "libs/redux/slices/globalSlice";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AdminHeader from "./components/AdminHeader";
import AdminSideBar from "./components/AdminSideBar";
import styles from "./styles/AdminLayout.module.scss";

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchText(""));
  });

  return (
    <div className={cx("admin-page")}>
      <AdminHeader cx={cx} />
      <div className={cx("body")}>
        <AdminSideBar />
        <main className={cx("content")}>{children}</main>
      </div>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
