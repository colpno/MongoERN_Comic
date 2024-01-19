import * as Yup from "yup";

export const createChapterFormValidation = Yup.object({
  order: Yup.number(),
  title: Yup.string().max(255, "Giới hạn độ dài là 255 ký tự."),
  cost: Yup.string().required("Chương tối thiểu là miễn phí"),
  cover: Yup.string().required("Ảnh bìa không được để trống."),
  contents: Yup.array().of(Yup.string()).min(1, "Nội dung không được để trống"),
});
