import { PayPalButtons } from "@paypal/react-paypal-js";
import { Select } from "components/index.jsx";
import { coinOptions } from "constants/controlOptions.constant";
import { useUpdateUser } from "hooks/index.jsx";
import { FormLabel } from "libs/formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import paypalService from "services/paypal.service.js";
import transactionService from "services/transaction.service.js";

function PayPalForm() {
  const [price, setPrice] = useState(coinOptions[0]);
  const { updateClientUser } = useUpdateUser();
  const user = useSelector((state) => state.user.user);

  const createOrder = async () => {
    const data = {
      name: "coin",
      price: price.value,
      quantity: 1,
      description: "Purchase coin",
    };
    const response = await paypalService.order(JSON.stringify([data]));
    return response.id;
  };

  const onApprove = async ({ orderID }) => {
    const transactionResponse = await paypalService.capture(orderID);

    if (transactionResponse.status === "COMPLETED") {
      try {
        const coin = Number.parseInt(price.label.split(" ")[0], 10);

        const data = {
          method: "paypal",
          unit: "coin",
          amount: coin,
        };

        transactionService
          .add(data)
          .then((response) => {
            console.log("response:", response);
            updateClientUser({ coin: user.coin + coin });
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    }

    return transactionResponse;
  };

  return (
    <>
      <FormLabel name="price" label="Chọn mức giá" required />
      <Select value={price} setValue={setPrice} options={coinOptions} />

      <div style={{ zIndex: 0, width: "2rem", marginTop: "2rem" }}>
        <PayPalButtons
          forceReRender={[price]}
          createOrder={() => createOrder()}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </div>
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
