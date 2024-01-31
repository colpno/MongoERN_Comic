import { usePayoutPayPalMutation } from "api/paypal.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function usePayoutPayPal() {
  const dispatch = useDispatch();
  const [payout, response] = usePayoutPayPalMutation();
  const { isLoading } = response;

  const handlePrePayout = async (receiverEmail, amount) => {
    await payout({ receiverEmail, amount }).unwrap();
  };

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  return { payout: handlePrePayout, ...response };
}

export default usePayoutPayPal;
