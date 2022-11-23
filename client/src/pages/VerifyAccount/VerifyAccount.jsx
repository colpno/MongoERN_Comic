import classNames from "classnames/bind";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { verifyAccount } from "services/auth";
import styles from "./VerifyAccount.module.scss";

const cx = classNames.bind(styles);

function VerifyAccount() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      verifyAccount({ token })
        .then((response) => {
          if (response.affectedRows) {
            alert("Đăng ký thành công");
            navigate("/login");
          }
        })
        .catch((error) => console.log(error));
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
