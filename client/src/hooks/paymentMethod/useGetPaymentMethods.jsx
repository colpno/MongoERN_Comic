import { useGetPaymentMethodsQuery } from "api/paymentMethod.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetPaymentMethods(params) {
  const dispatch = useDispatch();
  const response = useGetPaymentMethodsQuery(params);
  const { isLoading } = response;

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  return response;
}

export default useGetPaymentMethods;
