import { FastField, Form, Formik } from "formik";

import { Button } from "components";
import { coinOptions } from "constants/controlOptions.constant";
import { Loading } from "features";
import { FormLabel, SelectField } from "libs/formik";
import { useState } from "react";
import { paypalService } from "services";

function PayPalForm() {
  const [loading, setLoading] = useState(false);
  const init = {
    price: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const { price } = values;
    setLoading(true);

    if (price) {
      paypalService
        .create("coin", price)
        .then((response) => {
          setLoading(false);
          window.location.assign(response.link);
        })
        .catch((err) => console.error(err));
    }

    setSubmitting(false);
  };

  return (
    <>
      <Formik initialValues={init} onSubmit={handleSubmit}>
        {() => {
          return (
            <Form>
              <FormLabel name="price" label="Chọn mức giá" required />
              <FastField
                name="price"
                component={SelectField}
                options={coinOptions}
              />

              <Button primary large type="submit">
                Xác nhận
              </Button>
            </Form>
          );
        }}
      </Formik>
      {loading && <Loading />}
    </>
  );
}

PayPalForm.propTypes = {};

export default PayPalForm;

// option(value='') Không chọn
// option(value='VNPAYQR') Ngân hàng VNPAYQR
// option(value='NCB') Ngân hàng NCB
// option(value='SCB') Ngân hàng SCB
// option(value='SACOMBANK') Ngân hàng SACOMBANK
// option(value='EXIMBANK') Ngân hàng EXIMBANK
// option(value='MSBANK') Ngân hàng MSBANK
// option(value='NAMABANK') Ngân hàng NAMABANK
// option(value='VISA') Ngân hàng VISA
// option(value='VNMART') Ngân hàng VNMART
// option(value='VIETINBANK') Ngân hàng VIETINBANK
// option(value='VIETCOMBANK') Ngân hàng VIETCOMBANK
// option(value='HDBANK') Ngân hàng HDBANK
// option(value='DONGABANK') Ngân hàng Dong A
// option(value='TPBANK') Ngân hàng Tp Bank
// option(value='OJB') Ngân hàng OceanBank
// option(value='BIDV') Ngân hàng BIDV
// option(value='TECHCOMBANK') Ngân hàng Techcombank
// option(value='VPBANK') Ngân hàng VPBank
// option(value='AGRIBANK') Ngân hàng AGRIBANK
// option(value='MBBANK') Ngân hàng MBBank
// option(value='ACB') Ngân hàng ACB
// option(value='OCB') Ngân hàng OCB
// option(value='SHB') Ngân hàng SHB
// option(value='IVB') Ngân hàng IVB
