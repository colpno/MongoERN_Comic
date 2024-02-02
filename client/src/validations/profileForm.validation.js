import * as Yup from "yup";
import moment from "moment";

export const profileFormValidation = Yup.object({
  avatar: Yup.string().required("Hình đại diện không được để trống"),
  username: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/g, "Tên người dùng phải là chữ cái hoặc số")
    .max(20, "Độ dài tối đa là 20 ký tự")
    .required("Tên hiển thị không được để trống"),
  email: Yup.string().email("Định dạng mail không hợp lệ").required("Email không được để trống"),
  paypalEmail: Yup.string().email("Định dạng mail không hợp lệ"),
  dateOfBirth: Yup.date()
    .transform((value, originalValue) =>
      value ? moment(originalValue, "DD/MM/YYYY").toDate() : value
    )
    .typeError("Ngày sinh không chính xác")
    .min("01/01/1900", "Ngày sinh không được nhỏ hơn 01/01/1900")
    .max(moment().toDate(), "Ngày sinh không được vượt quá hôm nay"),
});
