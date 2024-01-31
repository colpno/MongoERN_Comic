import { useCapturePayPalMutation } from "api/paypal.api.js";
import { dollarToCoin } from "constants/controlOptions.constant.js";
import { useAddTransaction } from "hooks/index.jsx";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useCapturePayPal() {
  const dispatch = useDispatch();
  const [capture, response] = useCapturePayPalMutation();
  const { data, isLoading, isSuccess } = response;
  const { add: addTransaction } = useAddTransaction();

  const handlePreCapture = async (orderId) => {
    const captureResponse = await capture(orderId).unwrap();
    return captureResponse;
  };

  useEffect(() => {
    if (isSuccess && Object.keys(data).length > 0) {
      const { status } = data;

      if (status === "COMPLETED") {
        const dollar = data.purchase_units[0].payments.captures[0].amount.value; // handled only 1 purchased item
        const coin = dollarToCoin(dollar);

        const transaction = {
          method: "paypal",
          unit: "coin",
          amount: coin,
        };

        addTransaction(transaction);
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  return { capture: handlePreCapture, ...response };
}

export default useCapturePayPal;
