import * as Yup from "yup";

export const INITIAL_VALUE = {
  nickname: "",
  phone: "",
  dateOfBirth: "",
};

export const VALIDATION_SCHEMA = Yup.object({
  nickname: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/g, "Tên người dùng phải là chữ cái hoặc số")
    .max(15, "Độ dài tối đa là 15 ký tự")
    .required("Nickname là cần thiết để hiển thị"),
  phone: Yup.string()
    .min(10, "Số điện thoại gồm có 10 chữ số")
    .max(10, "Số điện thoại gồm có 10 chữ số")
    .matches(/\d+/g, "Số điện thoại chỉ bao gồm số")
    .matches(/^0/, "Số điện thoại bắt đầu bằng số 0")
    .required("Số điện thoại là cần thiết khi quên mật khẩu"),
  dataOfBirth: Yup.string(),
});
