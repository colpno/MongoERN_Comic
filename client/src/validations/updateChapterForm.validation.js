import * as Yup from "yup";

export const updateChapterFormValidation = Yup.object({
  order: Yup.number(),
  name: Yup.string()
    .max(255, "Giới hạn độ dài là 255 ký tự.")
    .required("Truyện cần phải có tiêu đề."),
  cost: Yup.string().required("Truyện tối thiểu là miễn phí"),
  cover: Yup.string().required("Truyện cần phải có ảnh bìa mặc định."),
  images: Yup.array().of(Yup.string()).min(1, "Cần tối thiểu 1 nội dung"),
});
