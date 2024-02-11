import { useUpdatePaymentMethodMutation } from "api/paymentMethod.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useUpdatePaymentMethod(params) {
  const dispatch = useDispatch();
  const [update, response] = useUpdatePaymentMethodMutation(params);
  const { isLoading } = response;

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  return { update, ...response };
}

export default useUpdatePaymentMethod;
