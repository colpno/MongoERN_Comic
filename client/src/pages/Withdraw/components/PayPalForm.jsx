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
    <Formik initialValues={{ receiver: "", amount: "" }} onSubmit={handleSubmit}>
      {() => {
        return (
          <Form>
            <FormLabel name="price" label="PayPal Email" required />
            <FastField name="receiver" component={InputField} />

            <FormLabel name="price" label="Số tiền ($ - Dollar)" required />
            <FastField name="amount" type="number" component={InputField} />

            <Button primary type="submit">
              Rút tiền
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default PayPalForm;
