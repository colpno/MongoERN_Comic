import classNames from "classnames/bind";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { authService } from "services";
import styles from "./VerifyAccount.module.scss";

const cx = classNames.bind(styles);

function VerifyAccount() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      authService
        .verifyRegister(token)
        .then((response) => {
          alert(response.message);
          navigate("/login");
        })
        .catch((error) => console.error(error));
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className={cx("wrapper")}>
      <span>Verifying...</span>
    </div>
  );
}

export default VerifyAccount;
