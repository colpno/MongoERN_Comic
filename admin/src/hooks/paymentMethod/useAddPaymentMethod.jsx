import { useAddPaymentMethodMutation } from "api/paymentMethod.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useAddPaymentMethod(params) {
  const dispatch = useDispatch();
  const [add, response] = useAddPaymentMethodMutation(params);
  const { isLoading } = response;

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  return { add, ...response };
}

export default useAddPaymentMethod;
