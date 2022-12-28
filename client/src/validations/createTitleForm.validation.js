import * as Yup from "yup";

export const createTitleFormValidation = Yup.object({
  title: Yup.string()
    .max(255, "Giới hạn độ dài là 255 ký tự.")
    .required("Tiêu đề truyện không được để trống."),
  genres: Yup.array()
    .min(1, "Truyện cần phải có tối thiểu 1 thể loại.")
    .max(3, "Truyện có tối đa 3 thể loại.")
    .of(Yup.string()),
  summary: Yup.string()
    .max(1000, "Giới hạn độ dài là 1000 ký tự.")
    .required("Mô tả không được để trống."),
  author: Yup.string()
    .max(255, "Giới hạn độ dài là 255 ký tự.")
    .required("Tác giả không được để trống."),
  coin: Yup.string()
    .max(3, "Giới hạn độ dài là 3 ký tự.")
    .required("Coin không được để trống."),
  release_day: Yup.string().required(
    "Ngày đăng hàng tuần phải không được để trống"
  ),
  cover: Yup.string().required("Ảnh bìa không được để trống."),
  // TODO: largeCoverTemp: Yup.string().required("Truyện cần phải có ảnh bìa."),
});
