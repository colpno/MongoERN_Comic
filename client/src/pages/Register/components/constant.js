import * as Yup from "yup";

export const INITIAL_VALUE = {
  userName: "",
  phone: "",
  password: "",
  confirmPassword: "",
  termOfService: false,
};
export const VALIDATION_SCHEMA = Yup.object({
  userName: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/g, "Tên đăng nhập chỉ gồm chữ cái và số")
    .max(15, "Độ dài tối đa là 15 ký tự")
    .required("Tên đăng nhập là cần thiết để hiển thị"),
  password: Yup.string()
    .min(8, "Tối thiểu 8 ký tự")
    .max(15, "Tối đa 15 ký tự")
    .matches(/[a-z]+/g, "Mật khẩu phải có tối thiểu 1 ký tự chữ thường")
    .matches(/[A-Z]+/g, "Mật khẩu phải có tối thiểu 1 ký tự chữ hoa")
    .matches(/\d+/g, "Mật khẩu phải có tối thiểu 1 ký tự số")
    .matches(/\W+/g, "Mật khẩu phải có tối thiểu 1 ký tự đặc biết")
    .required("Mật khẩu cần thiết cho sự an toàn của tài khoản"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Không khớp với mật khẩu")
    .required("Nhập lại mật khẩu để chắc chắn bạn nhập đúng mật khẩu"),
  phone: Yup.string()
    .min(10, "Số điện thoại gồm có 10 chữ số")
    .max(10, "Số điện thoại gồm có 10 chữ số")
    .matches(/\d+/g, "Số điện thoại chỉ bao gồm số")
    .matches(/^0/, "Số điện thoại bắt đầu bằng số 0")
    .required("Số điện thoại là cần thiết khi quên mật khẩu"),
  termOfService: Yup.boolean().oneOf(
    [true],
    "Bạn cần phải chấp nhận điều khoản của chúng tôi để có thể sử dụng dịch vụ"
  ),
});
