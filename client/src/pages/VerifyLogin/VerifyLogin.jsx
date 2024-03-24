/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { Button } from "components";
import { useVerifyLogin } from "hooks";
import useAuthenticate from "hooks/useAuthenticate.jsx";
import { useState } from "react";
import { BsBoxArrowInRight } from "react-icons/bs";
import Numpad from "./components/Numpad";
import OTPHead from "./components/OTPHead";
import OTPInput from "./components/OTPInput";
import ReSend from "./components/ReSend";
import styles from "./styles/VerifyLogin.module.scss";

const cx = classNames.bind(styles);

function VerifyLogin() {
  const { loginInfo } = useAuthenticate();
  const [currentDigit, setCurrentDigit] = useState(null);
  const [OTPValue, setOTPValue] = useState({
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
  });
  const { verifyLogin } = useVerifyLogin();

  const handleSubmit = () => {
    const otp = OTPValue.digit1 + OTPValue.digit2 + OTPValue.digit3 + OTPValue.digit4;
    const { id, username, email, oid } = loginInfo;

    if (!!id && !!username && !!email) {
      verifyLogin({ id, username, email, otp, oid });
    }
  };

  return (
    <div className={cx("container-content")}>
      <div className={cx("otp-container")}>
        <OTPHead loginInfo={loginInfo} />
        <OTPInput
          setCurrentDigit={setCurrentDigit}
          OTPValue={OTPValue}
          setOTPValue={setOTPValue}
          currentDigit={currentDigit}
        />
        <Button primary className={cx("btn-verify")} onClick={handleSubmit}>
          Xác thực <BsBoxArrowInRight className={cx("icon")} />
        </Button>
        <ReSend loginInfo={loginInfo} />
        <Numpad currentDigit={currentDigit} setOTPValue={setOTPValue} />
      </div>
    </div>
  );
}

export default VerifyLogin;
