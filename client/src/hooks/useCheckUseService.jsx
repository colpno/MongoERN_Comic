import { useLazyGetUserQuery } from "api/user.api.js";
import { emitToast } from "features/Toast.jsx";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function useCheckUseService(isUseLazy = false) {
  const dispatch = useDispatch();
  const [isPassed, setIsPassed] = useState(false);
  const [get, response] = useLazyGetUserQuery();
  const { isFetching, isSuccess, data } = response;

  const handleCheck = () => {
    const params = { _fields: "-_id paypal_email" };
    get(params);
  };

  const checkPayPalEmail = (user) => {
    const { paypal_email: paypalEmail } = user;
    if (!paypalEmail) {
      emitToast(
        "Bạn cần phải cập nhật thông tin về PayPal tại trang thông tin cá nhân để có thể sử dụng dịch vụ.",
        "info"
      );
      return false;
    }
    return true;
  };

  const handleLazyCheck = async () => {
    const params = { _fields: "-_id paypal_email" };
    const getResponse = await get(params).unwrap();
    let isOK = false;

    isOK = checkPayPalEmail(getResponse);

    return isOK;
  };

  useEffect(() => {
    if (isSuccess && !isFetching && !isUseLazy) {
      let isOK = false;
      isOK = checkPayPalEmail(data);
      isOK && setIsPassed(isOK);
    }
  }, [isSuccess, isFetching]);

  useEffect(() => {
    if (isFetching) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isFetching]);

  return { handleCheck, handleLazyCheck, ...response, isPassed };
}

export default useCheckUseService;
