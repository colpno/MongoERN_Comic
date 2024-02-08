import { useParams } from "react-router-dom";

import { ChapterForm, FormWrapper } from "components";
import { Popup } from "features";
import { useAddChapter, useGetChapters, usePopup } from "hooks";
import { createChapterFormValidation } from "validations";

function CreateChapter() {
  const { titleId } = useParams();
  const { popup, triggerPopup } = usePopup();
  const { add } = useAddChapter();
  const { data: chapters = {} } = useGetChapters({
    params: {
      title_id: titleId,
      _sort: {
        order: -1,
      },
      _limit: 1,
    },
  });
  const INITIAL_VALUE = {
    order: chapters?.data ? `${Number.parseInt(chapters.data[0].order || 0, 10) + 1}` : "1",
    title: "",
    status_id: "",
    cost: "false",
    cover: "",
    contents: [],
  };

  const handleSubmit = (values, resetForm) => {
    const params = {
      ...values,
      titleId,
    };

    add(params).then(() => {
      resetForm();
    });
  };

  return (
    <>
      <FormWrapper title="Thêm chương mới">
        <ChapterForm
          initialValues={INITIAL_VALUE}
          validationSchema={createChapterFormValidation}
          handleSubmit={handleSubmit}
        />
      </FormWrapper>
      <Popup data={popup} trigger={triggerPopup} />
    </>
  );
}

export default CreateChapter;
