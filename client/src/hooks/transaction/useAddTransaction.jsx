import { useAddTransactionMutation } from "api/transaction.api.js";
import { useUpdateUser } from "hooks/index.jsx";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function useAddTransaction() {
  const dispatch = useDispatch();
  const [add, response] = useAddTransactionMutation();
  const { isLoading, isSuccess, data } = response;
  const { updateClientUser } = useUpdateUser();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      const { unit } = data;

      if (unit === "coin") {
        updateClientUser({ coin: user.coin + Number.parseInt(data.amount, 10) });
      }
    }
  }, [isSuccess]);

  return { add, ...response };
}

export default useAddTransaction;
