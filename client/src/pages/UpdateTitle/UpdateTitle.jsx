import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import TitleForm from "components/TitleForm";
import { getTitleByID } from "services/titleServices";
import styles from "./UpdateTitle.module.scss";

const cx = classNames.bind(styles);

function UpdateTitle() {
  const { titleId } = useParams();
  const { title } = getTitleByID(titleId);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  const INITIAL_VALUE = title && {
    title: title.titleName,
    summary: title.summary,
    titleStatusId: `${title.titleStatusId}`,
    genreId: title.genreId.map((genre) => {
      return `${genre}`;
    }),
    coverImage: title.coverImage,
    largeCoverImage: title.coverImage,
    coverImageTemp: "",
    largeCoverImageTemp: "",
  };

  const VALIDATION_SCHEMA = Yup.object({
    title: Yup.string()
      .max(255, "Giới hạn độ dài của tiêu đề là 255 ký tự.")
      .required("Truyện cần phải có tiêu đề."),
    summary: Yup.string()
      .max(1000, "Giới hạn độ dài của mô tả là 1000 ký tự.")
      .required("Truyện cần phải có mô tả."),
    status: Yup.string().required("Vui lòng chọn trạng thái của truyện."),
    categories: Yup.array()
      .min(1, "Truyện cần phải có tối thiểu 1 thể loại.")
      .max(3, "Truyện có tối đa 3 thể loại.")
      .of(Yup.string()),
    email: Yup.string()
      .email("Sai định dạng email.")
      .required("Nhập email để xác nhận."),
  });

  return (
    <div className={cx("update-title")}>
      <h3 className={cx("head-title")}>Chỉnh sửa truyện</h3>
      {title && (
        <TitleForm
          handleSubmit={handleSubmit}
          initialValues={INITIAL_VALUE}
          imageBlob={{
            coverImage: title.coverImage,
            largeCoverImage: title.coverImage,
          }}
          validationSchema={VALIDATION_SCHEMA}
        />
      )}
    </div>
  );
}

export default UpdateTitle;
