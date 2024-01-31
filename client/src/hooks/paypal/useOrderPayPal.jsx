import { useOrderPayPalMutation } from "api/paypal.api.js";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useOrderPayPal() {
  const dispatch = useDispatch();
  const [order, response] = useOrderPayPalMutation();
  const { isLoading } = response;

  const handlePreOrder = async (data = {}) => {
    const stringifiedData = JSON.stringify([data]);
    const orderResponse = await order(stringifiedData).unwrap();
    return orderResponse;
  };

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  return { order: handlePreOrder, ...response };
}

export default useOrderPayPal;
