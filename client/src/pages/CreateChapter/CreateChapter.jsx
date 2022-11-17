import { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import ChapterForm from "components/ChapterForm";
import FormWrapper from "components/FormWrapper/FormWrapper";
import { Popup, ProgressCircle } from "features";
import { useToast } from "hooks";
import { addChapter, sortChapters } from "services/chapter";

function CreateChapter() {
  const [progress, setProgress] = useState(0);
  const { titleId } = useParams();
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "",
  });
  const { chapters, refetch } = sortChapters(titleId, "order", false, 1);

  const INITIAL_VALUE = {
    order: `${Number.parseInt(chapters[0]?.order || 0, 10) + 1}`,
    name: "",
    cost: "false",
    cover: "",
    images: [],
  };

  const VALIDATION_SCHEMA = Yup.object({
    order: Yup.number(),
    name: Yup.string()
      .max(255, "Giới hạn độ dài là 255 ký tự.")
      .required("Tiêu đề không được để trống."),
    cost: Yup.string().required("Chương tối thiểu là miễn phí"),
    cover: Yup.string().required("Ảnh bìa không được để trống."),
    images: Yup.array().of(Yup.string()).min(1, "Nội dung không được để trống"),
  });

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
    addChapter(data, setProgress)
      .then((response) => {
        if (response.affectedRows > 0) {
          toastEmitter("Truyện đã được thêm thành công", "success");
          setProgress(0);
          resetForm();
          refetch();
        }
      })
      .catch((error) => {
        toastEmitter(error.data.error || error.data.message, "error");
        setProgress(0);
      });

    setSubmitting(false);
  };

  return (
    <>
      <FormWrapper title="Thêm chương mới">
        <ChapterForm
          initialValues={INITIAL_VALUE}
          validationSchema={VALIDATION_SCHEMA}
          handleSubmit={handleSubmit}
        />
      </FormWrapper>
      <ProgressCircle percentage={progress} />
      <Popup popup={popup} setPopup={setPopup} />
      <Toast {...toastOptions} />
    </>
  );
}

export default CreateChapter;
