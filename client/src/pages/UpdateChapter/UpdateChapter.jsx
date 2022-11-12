/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import ChapterForm from "components/ChapterForm";
import { Popup, ProgressCircle } from "features";
import { getChapterByID, updateChapter } from "services/chapter";
import { getAllChapterImagesByChapterID } from "services/chapterImage";
import styles from "./UpdateChapter.module.scss";

const cx = classNames.bind(styles);

function UpdateChapter() {
  const { titleId, chapterId } = useParams();
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
        console.log(response);
        setProgress(0);
      })
      .catch((error) => {
        console.log("file: UpdateChapter.jsx ~ line 91 ~ error", error);
      });

    setSubmitting(false);
  };

  return (
    <>
      <div className={cx("wrapper")}>
        <h3 className={cx("head")}>Chỉnh sửa truyện</h3>
        {Object.keys(chapter).length && chapterImages.length > 0 && (
          <ChapterForm
            handleSubmit={handleSubmit}
            initialValues={INITIAL_VALUE}
            validationSchema={VALIDATION_SCHEMA}
          />
        )}
      </div>
      <ProgressCircle percentage={progress} />
      <Popup popup={popup} setPopup={setPopup} />
    </>
  );
}

export default UpdateChapter;
