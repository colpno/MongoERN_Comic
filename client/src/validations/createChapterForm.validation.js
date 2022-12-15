import * as Yup from "yup";

export const createChapterFormValidation = Yup.object({
  order: Yup.number(),
  name: Yup.string()
    .max(255, "Giới hạn độ dài là 255 ký tự.")
    .required("Tiêu đề không được để trống."),
  cost: Yup.string().required("Chương tối thiểu là miễn phí"),
  cover: Yup.string().required("Ảnh bìa không được để trống."),
  images: Yup.array().of(Yup.string()).min(1, "Nội dung không được để trống"),
});