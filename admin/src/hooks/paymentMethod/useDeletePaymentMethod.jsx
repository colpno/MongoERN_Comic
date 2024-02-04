import { useDeletePaymentMethodMutation } from "api/paymentMethod.api";
import { setLoading } from "libs/redux/slices/common.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useDeletePaymentMethod(params) {
  const dispatch = useDispatch();
  const [del, response] = useDeletePaymentMethodMutation(params);
  const { isFetching } = response;

  useEffect(() => {
    if (isFetching) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isFetching]);

  return { del, ...response };
}

export default useDeletePaymentMethod;
