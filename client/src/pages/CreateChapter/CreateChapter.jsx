import classNames from "classnames/bind";
import { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import ChapterForm from "components/ChapterForm";
import { Popup, ProgressCircle } from "features";
import { addChapter, sortChapters } from "services/chapter";
import styles from "./CreateChapter.module.scss";

const cx = classNames.bind(styles);

function CreateChapter() {
  const [progress, setProgress] = useState(0);
  const { titleId } = useParams();
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "",
  });
  const { chapters, refetch } = sortChapters(titleId, "order", false, 1);

  const handleSubmit = (
    { cover, images, ...values },
    { setSubmitting, resetForm }
  ) => {
    const data = {
      ...values,
      titleId,
      cover,
      images,
    };
    addChapter(data, setProgress).then((response) => {
      if (response.affectedRows > 0) {
        setPopup({ ...popup, trigger: true, content: "Thêm thành công" });
        setProgress(0);
        refetch();
        resetForm();
      }
    });

    setSubmitting(false);
  };

  const INITIAL_VALUE =
    chapters.length > 0
      ? {
          order: `${Number.parseInt(chapters[0]?.order, 10) + 1}`,
          name: "",
          cost: "false",
          cover: "",
          images: [],
        }
      : {
          order: `1`,
          name: "",
          cost: "false",
          cover: "",
          images: [],
        };

  const VALIDATION_SCHEMA = Yup.object({
    order: Yup.number(),
    name: Yup.string()
      .max(255, "Giới hạn độ dài là 255 ký tự.")
      .required("Chương phải có tiêu đề."),
    cost: Yup.string().required("Chương tối thiểu là miễn phí"),
    cover: Yup.string().required("Chương phải có ảnh bìa mặc định."),
    images: Yup.array().of(Yup.string()).min(1, "Cần tối thiểu 1 nội dung"),
  });

  return (
    <>
      <div className={cx("wrapper")}>
        <h3 className={cx("head")}>Thêm chương mới</h3>
        {INITIAL_VALUE.order - 1 === (chapters[0]?.order || 0) && (
          <ChapterForm
            initialValues={INITIAL_VALUE}
            validationSchema={VALIDATION_SCHEMA}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
      <ProgressCircle percentage={progress} />
      <Popup popup={popup} setPopup={setPopup} />
    </>
  );
}

export default CreateChapter;
