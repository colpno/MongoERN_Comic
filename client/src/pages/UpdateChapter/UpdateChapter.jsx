import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { ChapterForm, FormWrapper } from "components";
import { useToast } from "hooks";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useDispatch } from "react-redux";
import { chapterService } from "services";
import { updateChapterFormValidation } from "validations/updateChapterForm.validation";

function UpdateChapter() {
  const dispatch = useDispatch();
  const { chapterId } = useParams();
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const [chapter, setChapter] = useState({});

  const INITIAL_VALUE = useMemo(
    () =>
      Object.keys(chapter).length > 0
        ? {
            title: chapter.title,
            status_id: chapter.status_id._id,
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
              cont.source === content && removeContents.push(cont.cloud_public_id);
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

  const handleSubmit = (values) => {
    dispatch(setLoading(true));

    const changedValues = getChangedValues(values);
    changedValues.titleId = chapter.title_id;

    if (Object.keys(changedValues).length > 1) {
      chapterService
        .update(chapterId, changedValues)
        .then((response) => {
          toastEmitter(response.message, "success");
        })
        .catch((error) => {
          toastEmitter(error, "error");
        });
    }

    dispatch(setLoading(false));
  };

  useEffect(() => {
    chapterService
      .getOne(chapterId, {
        _embed: JSON.stringify([{ collection: "status_id", fields: "_id" }]),
      })
      .then((response) => setChapter(response.data))
      .catch((error) => toastEmitter(error, "error"));
  }, []);

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
      <Toast {...toastOptions} />
    </>
  );
}

export default UpdateChapter;
