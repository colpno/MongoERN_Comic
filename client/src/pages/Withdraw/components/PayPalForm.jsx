import { FastField, Form, Formik } from "formik";
import React from "react";

import { Button } from "components";
import { InputField } from "libs/formik";
import { paypalService } from "services";

function PayPalForm() {
  const handleSubmit = (values, { setSubmitting }) => {
    const data = {
      amount: "10.00",
      receiver: "sb-4iedz24663946@personal.example.com",
    };

    paypalService
      .payout(data)
      .then(() => {
        // console.log(response);
        // window.open(response.link, "_blank");
      })
      .catch((error) => console.error(error));

    setSubmitting(false);
  };

  return (
    <Formik initialValues={{ amount: "" }} onSubmit={handleSubmit}>
      {() => {
        return (
          <Form>
            <FastField name="amount" component={InputField} />

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
