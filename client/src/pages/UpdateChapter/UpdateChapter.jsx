/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { ChapterForm, FormWrapper } from "components";
import { Popup, ProgressCircle } from "features";
import { useToast } from "hooks";
import { updateChapterFormValidation } from "validations/updateChapterForm.validation";
import { chapterService } from "services";

function UpdateChapter() {
  const { chapterId } = useParams();
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "",
  });
  const [progress, setProgress] = useState(0);
  const [chapter, setChapter] = useState({});

  const fetchData = () => {
    chapterService
      .getOne(chapterId)
      .then((response) => setChapter(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const INITIAL_VALUE = useMemo(
    () =>
      Object.keys(chapter).length > 0
        ? {
            title: chapter.title,
            cost: `${chapter.cost}`,
            order: `${chapter.order}`,
            cover: chapter.cover.source,
            contents: chapter.contents.map((content) => content.source),
          }
        : {},
    [chapter]
  );

  const getChangedValues = (values) => {
    const valueKeys = Object.keys(values);

    const changedValues = valueKeys.reduce((obj, key) => {
      if (key === "contents") {
        const removeContents = [];
        const initContentsLength = INITIAL_VALUE.contents.length;
        const valuesContentsLength = values.contents.length;

        // check if the old contents are removed
        for (let i = 0; i < initContentsLength; i++) {
          const content = INITIAL_VALUE.contents[i];
          let isIn = false;

          for (let j = 0; j < valuesContentsLength; j++) {
            const cont = values.contents[j];

            // the old content exists in new contents
            if (cont === content) {
              isIn = true;
              break;
            }
          }

          // not exist in new contents
          if (!isIn) {
            // get cloud_public_id of the content
            chapter.contents.forEach((cont) => {
              if (cont.source === content)
                removeContents.push(cont.cloud_public_id);
            });
          }
        }

        return {
          ...obj,
          [key]: {
            remove: removeContents,
            new: values.contents,
          },
        };
      }
      if (JSON.stringify(values[key]) !== JSON.stringify(INITIAL_VALUE[key])) {
        return { ...obj, [key]: values[key] };
      }
      return obj;
    }, {});

    return changedValues;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const changedValues = getChangedValues(values);
    changedValues.guid = chapter._guid;
    changedValues.titleId = chapter.title_id;

    if (Object.keys(changedValues).length > 1) {
      chapterService
        .update(chapterId, changedValues, setProgress)
        .then((response) => {
          toastEmitter(response.message, "success");
          setProgress(0);
        })
        .catch((error) => {
          toastEmitter(error, "error");
          setProgress(0);
        });
    }

    setSubmitting(false);
  };

  return (
    <>
      <FormWrapper title="Chỉnh sửa chương">
        {Object.keys(chapter).length && (
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
