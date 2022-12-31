import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

import { cancel } from "assets/images";
import { Button } from "components";
import styles from "./Cancel.module.scss";

const cx = classNames.bind(styles);

function Cancel() {
  const navigate = useNavigate();

  return (
    <div className={cx("container")}>
      <div className={cx("popup")} id={cx("error")}>
        <div className={cx("popup-content")}>
          <div className={cx("imgbox")}>
            <img src={cancel} alt="" className={cx("img")} />
          </div>
          <div className={cx("title")}>
            <h3>Sorry</h3>
          </div>
          <p className={cx("para")}>Something went wrong. Please try again!</p>
          <Button
            className={cx("button")}
            id={cx("e_button")}
            onClick={() => navigate("/")}
          >
            TRY AGAIN
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cancel;
