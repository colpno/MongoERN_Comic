import * as Yup from "yup";

export const loginFormValidation = Yup.object({
  username: Yup.string()
    .matches(/^\w+$/g, "Tên người dùng phải là chữ cái hoặc số")
    .trim()
    .required("Tên đăng nhập không được để trống"),
  password: Yup.string().required("Bạn phải điền mật khẩu"),
});
