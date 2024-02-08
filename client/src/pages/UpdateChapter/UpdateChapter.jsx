import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { ChapterForm, FormWrapper } from "components";
import { useGetChapter, useUpdateChapter } from "hooks/index.jsx";
import { updateChapterFormValidation } from "validations/updateChapterForm.validation";

function UpdateChapter() {
  const { chapterId } = useParams();
  const { update: updateChapter } = useUpdateChapter();
  const { data: chapter = [] } = useGetChapter({
    id: chapterId,
  });

  const INITIAL_VALUE = useMemo(
    () =>
      Object.keys(chapter).length > 0
        ? {
            title: chapter.title,
            status_id: chapter.status_id,
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
    const changedValues = getChangedValues(values);
    changedValues.titleId = chapter.title_id;

    if (Object.keys(changedValues).length > 1) {
      updateChapter({ id: chapterId, data: changedValues });
    }
  };

  return (
    <FormWrapper title="Chỉnh sửa chương">
      {Object.keys(chapter).length > 0 && (
        <ChapterForm
          handleSubmit={handleSubmit}
          initialValues={INITIAL_VALUE}
          validationSchema={updateChapterFormValidation}
        />
      )}
    </FormWrapper>
  );
}

export default UpdateChapter;
