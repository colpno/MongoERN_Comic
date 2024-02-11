import { useDeletePaymentMethodMutation } from "api/paymentMethod.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useDeletePaymentMethod(params) {
  const dispatch = useDispatch();
  const [del, response] = useDeletePaymentMethodMutation(params);
  const { isLoading } = response;

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  return { del, ...response };
}

export default useDeletePaymentMethod;
