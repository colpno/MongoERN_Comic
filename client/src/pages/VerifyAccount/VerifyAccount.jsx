import classNames from "classnames/bind";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { authService } from "services";
import styles from "./VerifyAccount.module.scss";

const cx = classNames.bind(styles);

function VerifyAccount() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      authService.verifyRegister(token).then((response) => {
        alert(response.message);
        navigate("/login");
      });
    } else {
      navigate("/");
    }
  }, [token]);

  return (
    <div className={cx("wrapper")}>
      <span>Verifying...</span>
    </div>
  );
}

export default VerifyAccount;
