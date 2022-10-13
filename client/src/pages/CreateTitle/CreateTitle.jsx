import * as Yup from "yup";
import classNames from "classnames/bind";
import TitleForm from "components/TitleForm";
import styles from "./CreateTitle.module.scss";

const cx = classNames.bind(styles);

function CreateTitle() {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  const INITIAL_VALUE = {
    title: "",
    summary: "",
    titleStatusId: "",
    genreId: [],
    // coverImageTemp: "",
    // largeCoverImageTemp: "",
    // email: "",
  };

  const VALIDATION_SCHEMA = Yup.object({
    title: Yup.string()
      .max(255, "Giới hạn độ dài của tiêu đề là 255 ký tự.")
      .required("Truyện cần phải có tiêu đề."),
    summary: Yup.string()
      .max(1000, "Giới hạn độ dài của mô tả là 1000 ký tự.")
      .required("Truyện cần phải có mô tả."),
    status: Yup.string().required("Vui lòng chọn trạng thái của truyện."),
    genreId: Yup.array()
      .min(1, "Truyện cần phải có tối thiểu 1 thể loại.")
      .max(3, "Truyện có tối đa 3 thể loại.")
      .of(Yup.string()),
    coverImageTemp: Yup.string().required(
      "Truyện cần phải có ảnh bìa mặc định."
    ),
    largeCoverImageTemp: Yup.string().required("Truyện cần phải có ảnh bìa."),
    email: Yup.string()
      .email("Sai định dạng email.")
      .required("Nhập email để xác nhận."),
  });

  return (
    <div className={cx("create-title")}>
      <h3 className={cx("head-title")}>Thêm truyện mới</h3>
      <TitleForm
        handleSubmit={handleSubmit}
        initialValues={INITIAL_VALUE}
        validationSchema={VALIDATION_SCHEMA}
      />
    </div>
  );
}

export default CreateTitle;
