import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ChapterForm, FormWrapper } from "components";
import { Popup, ProgressCircle } from "features";
import { usePopup, useToast } from "hooks";
import { createChapterFormValidation } from "validations";
import { chapterService } from "services";

function CreateChapter() {
  const { titleId } = useParams();
  const [progress, setProgress] = useState(0);
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const [chapters, setChapters] = useState([]);
  const { popup, triggerPopup } = usePopup();

  const INITIAL_VALUE = {
    order: `${Number.parseInt(chapters[0]?.order || 0, 10) + 1}`,
    title: "",
    status_id: "",
    cost: "false",
    cover: "",
    contents: [],
  };

  const fetchData = () => {
    const params = {
      title_id: titleId,
      _sort: "order",
      _order: "desc",
      _limit: 1,
    };
    chapterService
      .getAll(params)
      .then((response) => setChapters(response.data))
      .catch((error) => toastEmitter(error, "error"));
  };

  const handleSubmit = (values, resetForm) => {
    const params = {
      ...values,
      titleId,
    };

    chapterService
      .add(params, setProgress)
      .then(() => {
        toastEmitter("Truyện đã được thêm thành công", "success");
        setProgress(0);
        fetchData();
        resetForm();
      })
      .catch((error) => {
        toastEmitter(error, "error");
        setProgress(0);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <FormWrapper title="Thêm chương mới">
        <ChapterForm
          initialValues={INITIAL_VALUE}
          validationSchema={createChapterFormValidation}
          handleSubmit={handleSubmit}
        />
      </FormWrapper>
      <ProgressCircle percentage={progress} />
      {popup.isShown && <Popup data={popup} setShow={triggerPopup} />}
      <Toast {...toastOptions} />
    </>
  );
}

export default CreateChapter;
