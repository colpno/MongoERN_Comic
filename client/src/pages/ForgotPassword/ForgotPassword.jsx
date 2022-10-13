import classNames from "classnames/bind";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Container } from "react-bootstrap";

import { Button } from "components";
import FormWrapper from "components/FormWrapper/FormWrapper";
import useMultipleForms from "hooks/useMultipleForms";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import styles from "./styles/ForgotPassword.module.scss";

const cx = classNames.bind(styles);

function ForgotPassword() {
  const forms = [Step1, Step2, Step3];
  const { step, isFirstStep, isLastStep, next, back } = useMultipleForms(forms);
  const Component = step;

  const handleSubmit = (values, a) => {
    // setSubmitting(false);
    console.log(values);
    console.log(a);
    !isLastStep && next();
  };

  return (
    // <Container className={cx("wrapper")}>
    //   <h2 className={cx("title")}>Quên mật khẩu</h2>
    //   {step === 1 && <Step1 setStep={setStep} cx={cx} />}
    //   {step === 2 && <Step2 step={step} setStep={setStep} cx={cx} />}
    //   {step === 3 && <Step3 step={step} setStep={setStep} cx={cx} />}
    // </Container>
    <Container>
      <FormWrapper title="Quên mật khẩu" cx={cx}>
        <Component handleSubmit={handleSubmit}>
          <div className={cx("steps")}>
            {!isFirstStep && (
              <Button outline small onClick={() => back()}>
                <FaChevronLeft className={cx("chevron-icon", "chevron-left")} />
                Lùi
              </Button>
            )}
            <Button
              primary
              small
              type={isLastStep ? "submit" : ""}
              onClick={handleSubmit}
            >
              {isLastStep ? "Hoàn thành" : "Tiến"}
              <FaChevronRight className={cx("chevron-icon", "chevron-right")} />
            </Button>
          </div>
        </Component>
      </FormWrapper>
    </Container>
  );
}

export default ForgotPassword;
