import * as Yup from "yup";

export const updateTitleFormValidation = Yup.object({
  name: Yup.string()
    .max(255, "Giới hạn độ dài của tiêu đề là 255 ký tự.")
    .required("Truyện cần phải có tiêu đề."),
  summary: Yup.string()
    .max(1000, "Giới hạn độ dài của mô tả là 1000 ký tự.")
    .required("Truyện cần phải có mô tả."),
  titleStatusId: Yup.string().required("Vui lòng chọn trạng thái của truyện."),
  author: Yup.string()
    .max(255, "Giới hạn độ dài là 255 ký tự.")
    .required("Tác giả không được để trống."),
  genreId: Yup.array()
    .min(1, "Truyện cần phải có tối thiểu 1 thể loại.")
    .max(3, "Truyện có tối đa 3 thể loại.")
    .of(Yup.string()),
  releaseDay: Yup.string().required(
    "Ngày đăng hàng tuần phải không được để trống"
  ),
  cover: Yup.string().required("Truyện cần phải có ảnh bìa mặc định."),
  largeCover: Yup.string().required("Truyện cần phải có ảnh bìa."),
  coin: Yup.string()
    .max(3, "Giới hạn độ dài là 3 ký tự.")
    .required("Truyện cần phải có số coin mặc định cho tất cả chương."),
  /* TODO
     email: Yup.string()
       .email("Sai định dạng email.")
       .required("Nhập email để xác nhận."),
    */
});
