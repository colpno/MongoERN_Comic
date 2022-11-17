import { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import ChapterForm from "components/ChapterForm";
import FormWrapper from "components/FormWrapper/FormWrapper";
import { Popup, ProgressCircle } from "features";
import { useToast } from "hooks";
import { getChapterByID, updateChapter } from "services/chapter";
import { getAllChapterImagesByChapterID } from "services/chapterImage";

function UpdateChapter() {
  const { titleId, chapterId } = useParams();
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "",
  });
  const [progress, setProgress] = useState(0);
  const { chapter } = getChapterByID(chapterId);
  const { chapterImages } = getAllChapterImagesByChapterID(chapterId);

  const INITIAL_VALUE = chapter &&
    chapterImages.length > 0 && {
      name: chapter.name,
      cost: `${chapter.cost}`,
      order: `${chapter.order}`,
      cover: chapter.cover,
      images: chapterImages.map((chapterImage) => chapterImage.image),
    };

  const VALIDATION_SCHEMA = Yup.object({
    order: Yup.number(),
    name: Yup.string()
      .max(255, "Giới hạn độ dài là 255 ký tự.")
      .required("Truyện cần phải có tiêu đề."),
    cost: Yup.string().required("Truyện tối thiểu là miễn phí"),
    cover: Yup.string().required("Truyện cần phải có ảnh bìa mặc định."),
    images: Yup.array().of(Yup.string()).min(1, "Cần tối thiểu 1 nội dung"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const valueKeys = Object.keys(values);

    const changedValues = valueKeys.reduce((obj, key) => {
      if (key === "images") {
        if (INITIAL_VALUE.images.length !== values.images.length) {
          return { ...obj, [key]: values[key] };
        }

        let isDifference = false;
        for (let i = 0; i < INITIAL_VALUE[key].length; i++) {
          if (INITIAL_VALUE[key][i] !== values[key][i]) {
            isDifference = true;
            break;
          }
        }
        return isDifference ? { ...obj, [key]: values[key] } : obj;
      }
      if (JSON.stringify(values[key]) !== JSON.stringify(INITIAL_VALUE[key])) {
        return { ...obj, [key]: values[key] };
      }
      return obj;
    }, {});

    const data = {
      titleId,
      newValues: changedValues,
    };
    updateChapter(chapterId, data, setProgress)
      .then((response) => {
        if (response.affectedRows > 0) {
          toastEmitter("Truyện đã được thay đổi thành công", "success");
          setProgress(0);
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
      <FormWrapper title="Chỉnh sửa chương">
        {Object.keys(chapter).length && chapterImages.length > 0 && (
          <ChapterForm
            handleSubmit={handleSubmit}
            initialValues={INITIAL_VALUE}
            validationSchema={VALIDATION_SCHEMA}
          />
        )}
      </FormWrapper>
      <ProgressCircle percentage={progress} />
      <Popup popup={popup} setPopup={setPopup} />
      <Toast {...toastOptions} />
    </>
  );
}

export default UpdateChapter;
