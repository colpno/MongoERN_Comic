import * as Yup from "yup";

export const updateTitleFormValidation = Yup.object({
  title: Yup.string()
    .trim()
    .max(255, "Giới hạn độ dài của tiêu đề là 255 ký tự.")
    .matches(/[\w]/, "Chỉ bao gồm chữ cái và số."),
  status_id: Yup.string().required("Trạng thái truyện không được để trống."),
  summary: Yup.string()
    .max(1000, "Giới hạn độ dài của mô tả là 1000 ký tự.")
    .required("Truyện cần phải có mô tả."),
  // TODO: titleStatusId: Yup.string().required("Vui lòng chọn trạng thái của truyện."),
  author: Yup.string()
    .trim()
    .max(255, "Giới hạn độ dài là 255 ký tự.")
    .required("Tác giả không được để trống."),
  genres: Yup.array()
    .min(1, "Truyện cần phải có tối thiểu 1 thể loại.")
    .max(3, "Truyện có tối đa 3 thể loại.")
    .of(Yup.string()),
  release_day: Yup.string().required("Ngày đăng hàng tuần phải không được để trống"),
  cover: Yup.string().required("Truyện cần phải có ảnh bìa mặc định."),
  // TODO: largeCover: Yup.string().required("Truyện cần phải có ảnh bìa."),
  coin: Yup.string()
    .max(3, "Giới hạn độ dài là 3 ký tự.")
    .required("Truyện cần phải có số coin mặc định cho tất cả chương."),
  /* TODO
     email: Yup.string()
       .email("Sai định dạng email.")
       .required("Nhập email để xác nhận."),
    */
});
