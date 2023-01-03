import classNames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { checked } from "assets/images";
import { Button } from "components";
import { setUser } from "libs/redux/slices/user.slice";
import { paypalService } from "services";
import styles from "../styles/Success.module.scss";

const cx = classNames.bind(styles);

function Success() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryLocation = location.search;
  useEffect(() => {
    async function fetchSession() {
      paypalService
        .get(queryLocation)
        .then((response) => {
          dispatch(setUser(response.user));
        })
        .catch((error) => console.error(error));
    }
    queryLocation.length > 0 && fetchSession();
  }, [queryLocation]);
  return (
    <div className={cx("container")}>
      <div className={cx("success")}>
        <div className={cx("popup")} id={cx("success")}>
          <div className={cx("popup-content")}>
            <div className={cx("imgbox")}>
              <img src={checked} alt="" className={cx("img")} />
            </div>
            <div className={cx("title")}>
              <h3>Success!</h3>
            </div>
            <p className={cx("para")}>Your account has been created successfully</p>
            <Button className={cx("button")} id={cx("s_button")} to="/">
              OKAY
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
