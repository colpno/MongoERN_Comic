import * as Yup from "yup";

export const updateChapterFormValidation = Yup.object({
  order: Yup.number(),
  title: Yup.string().max(255, "Giới hạn độ dài là 255 ký tự."),
  cost: Yup.string().required("Truyện tối thiểu là miễn phí"),
  cover: Yup.string().required("Truyện cần phải có ảnh bìa mặc định."),
  contents: Yup.array().of(Yup.string()).min(1, "Cần tối thiểu 1 nội dung"),
});
