import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ChapterForm from "components/ChapterForm";
import FormWrapper from "components/FormWrapper/FormWrapper";
import { Popup, ProgressCircle } from "features";
import { useToast } from "hooks";
import { getChapter, updateChapter } from "services/chapter";
import { getAllChapterImages } from "services/chapterImage";
import { updateChapterFormValidation } from "validations/updateChapterForm.validation";

function UpdateChapter() {
  const { titleId, chapterId } = useParams();
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "",
  });
  const [progress, setProgress] = useState(0);
  const [chapter, setChapter] = useState({});
  const [chapterContents, setChapterContents] = useState([]);

  const fetchData = () => {
    const chapterPromise = getChapter(chapterId);
    const chapterContentsPromise = getAllChapterImages({ chapterId });

    Promise.all([chapterPromise, chapterContentsPromise])
      .then(([chapterResponse, chapterContentsResponse]) => {
        setChapter(chapterResponse);
        setChapterContents(chapterContentsResponse);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const INITIAL_VALUE = chapter &&
    chapterContents.length > 0 && {
      name: chapter.name,
      cost: `${chapter.cost}`,
      order: `${chapter.order}`,
      cover: chapter.cover,
      images: chapterContents.map((chapterImage) => chapterImage.image),
    };

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
        {Object.keys(chapter).length && chapterContents.length > 0 && (
          <ChapterForm
            handleSubmit={handleSubmit}
            initialValues={INITIAL_VALUE}
            validationSchema={updateChapterFormValidation}
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
