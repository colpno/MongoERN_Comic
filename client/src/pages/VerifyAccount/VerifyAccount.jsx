import classNames from "classnames/bind";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useVerifyRegister } from "hooks/index.jsx";
import styles from "./VerifyAccount.module.scss";

const cx = classNames.bind(styles);

function VerifyAccount() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { verifyRegister } = useVerifyRegister();

  useEffect(() => {
    if (token) {
      verifyRegister(token);
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
