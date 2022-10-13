import classNames from "classnames/bind";
import * as Yup from "yup";
import ChapterForm from "components/ChapterForm";
import styles from "./CreateChapter.module.scss";

const cx = classNames.bind(styles);

function CreateChapter() {
  const handleSubmit = (values, { setSubmitting }) => {
    values.coverImage = values.coverImageFake
      ? values.coverImageFake
      : values.coverImage;
    console.log(values);
    setSubmitting(false);
  };

  const INITIAL_VALUE = {
    order: "1",
    titleName: "",
    contents: [],
    authorNote: "",
    schedule: "",

    // Temporarily variables, assigned to real variables later in handleSubmit()
    coverImageFake: "",
    contentsFake: [],
  };

  const VALIDATION_SCHEMA = Yup.object({
    order: Yup.number(),
    title: Yup.string()
      .max(255, "Giới hạn độ dài là 255 ký tự.")
      .required("Truyện cần phải có tiêu đề."),
    coverImageFake: Yup.string().required(
      "Truyện cần phải có ảnh bìa mặc định."
    ),
    contentFake: Yup.array().of(Yup.string()),
    authorNote: Yup.string().max(500, "Giới hạn độ dài là 500 ký tự."),
    schedule: Yup.string(),
  });

  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("head")}>Thêm chương mới</h3>
      <ChapterForm
        initialValues={INITIAL_VALUE}
        validationSchema={VALIDATION_SCHEMA}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default CreateChapter;
