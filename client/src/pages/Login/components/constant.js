import * as Yup from "yup";

export const INITIAL_VALUE = {
  userName: "",
  password: "",
};

export const VALIDATION_SCHEMA = Yup.object({
  userName: Yup.string()
    .matches(/^\w+$/g, "Tên người dùng phải là chữ cái hoặc số")
    .required("Bạn phải điền tên đăng nhập"),
  password: Yup.string().required("Bạn phải điền mật khẩu"),
});
