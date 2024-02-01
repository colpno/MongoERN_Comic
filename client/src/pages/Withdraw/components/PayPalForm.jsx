import { FastField, Form, Formik } from "formik";

import { Button } from "components";
import { usePayoutPayPal } from "hooks/index.jsx";
import { FormLabel, InputField } from "libs/formik";

function PayPalForm() {
  const { payout } = usePayoutPayPal();

  const handleSubmit = (values, { setSubmitting }) => {
    const { receiver, amount } = values;
    payout(receiver, amount);
    setSubmitting(false);
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
