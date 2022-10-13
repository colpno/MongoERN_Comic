import classNames from "classnames/bind";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import chapterApi from "api/chapterApi";
import ChapterForm from "components/ChapterForm";
import { formatToDateTimeString } from "utils/convertTime";
import styles from "./UpdateChapter.module.scss";

const cx = classNames.bind(styles);

function UpdateChapter() {
  const [chapter, setChapter] = useState();
  const id = useParams().chapterId;

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await chapterApi.getOneById(id);
        setChapter(response);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchChapter();
  }, []);

  const handleSubmit = (values) => {
    // values.coverImage = values.coverImageFake
    //   ? values.coverImageFake
    //   : values.coverImage;
    console.log(values);
    // setSubmitting(false);
  };

  const INITIAL_VALUE = chapter && {
    ...chapter,
    order: `${chapter.order}`,
    schedule: formatToDateTimeString(chapter.schedule, "/"),

    // Temporarily variables, assigned to real variables later in handleSubmit()
    coverImageFake: "",
    contentsFake: [],
  };

  const VALIDATION_SCHEMA = Yup.object({
    order: Yup.number(),
    title: Yup.string()
      .max(255, "Giới hạn độ dài là 255 ký tự.")
      .required("Truyện cần phải có tiêu đề."),
    authorNote: Yup.string().max(500, "Giới hạn độ dài là 500 ký tự."),
    schedule: Yup.string(),
  });

  const imageBlob = chapter && {
    coverImage: chapter.coverImage,
    contents: chapter.contents,
  };

  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("head")}>Chỉnh sửa truyện</h3>
      {chapter && (
        <ChapterForm
          handleSubmit={handleSubmit}
          initialValues={INITIAL_VALUE}
          validationSchema={VALIDATION_SCHEMA}
          imageBlob={imageBlob}
        />
      )}
    </div>
  );
}

export default UpdateChapter;
