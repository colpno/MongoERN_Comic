import * as Yup from "yup";

export const registerFormValidation = Yup.object({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/g, "Tên đăng nhập chỉ gồm chữ cái và số")
    .max(20, "Độ dài tối đa là 20 ký tự")
    .required("Tên đăng nhập không được để trống"),
  password: Yup.string()
    .min(8, "Tối thiểu 8 ký tự")
    .max(20, "Tối đa 20 ký tự")
    .matches(/[a-z]+/g, "Tối thiểu 1 ký tự chữ thường")
    .matches(/[A-Z]+/g, "Tối thiểu 1 ký tự chữ hoa")
    .matches(/\d+/g, "Tối thiểu 1 ký tự số")
    .matches(/\W+/g, "Tối thiểu 1 ký tự đặc biết")
    .required("Mật khẩu không được để trống"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Mật khẩu Không trùng khớp")
    .required("Nhập lại mật khẩu để chắc chắn bạn nhập đúng mật khẩu"),
  email: Yup.string().email("Định dạng mail không hợp lệ").required("Email không được để trống"),
});
