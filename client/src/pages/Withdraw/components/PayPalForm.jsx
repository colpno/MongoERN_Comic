import { FastField, Form, Formik } from "formik";

import { Button } from "components";
import { usePayoutPayPal } from "hooks/index.jsx";
import { FormLabel, InputField } from "libs/formik";
import { useSelector } from "react-redux";

function PayPalForm() {
  const { payout } = usePayoutPayPal();
  const user = useSelector((state) => state.user.user);

  const canWithdraw = (amount) => {
    if (user.income - Number.parseFloat(amount) >= 0) {
      return true;
    }
    return false;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const { receiver, amount } = values;

    if (canWithdraw(amount)) {
      payout(receiver, amount);
    }
  };

  return (
    <Formik initialValues={{ amount: "" }} onSubmit={handleSubmit}>
      {() => {
        return (
          <Form>
            <FormLabel name="price" label="Số tiền ($ - Dollar)" required />
            <FastField name="amount" type="number" component={InputField} />

            <Button primary type="submit" style={{ margin: "2rem 0 4rem" }}>
              Rút tiền
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default PayPalForm;
