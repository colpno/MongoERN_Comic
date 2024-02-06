import * as Yup from "yup";

export const changePasswordFormValidation = Yup.object({
  password: Yup.string()
    .min(8, "Tối thiểu 8 ký tự")
    .max(20, "Tối đa 20 ký tự")
    .matches(/[a-z]+/g, "Tối thiểu 1 ký tự chữ thường")
    .matches(/[A-Z]+/g, "Tối thiểu 1 ký tự chữ hoa")
    .matches(/\d+/g, "Tối thiểu 1 ký tự số")
    .matches(/\W+/g, "Tối thiểu 1 ký tự đặc biết")
    .required("Mật khẩu không được để trống"),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Mật khẩu Không trùng khớp")
    .required("Nhập lại mật khẩu để chắc chắn bạn nhập đúng mật khẩu"),
});
