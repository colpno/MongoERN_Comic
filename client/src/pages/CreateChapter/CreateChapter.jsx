import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ChapterForm, FormWrapper } from "components";
import { Popup } from "features";
import { usePopup, useToast } from "hooks";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useDispatch } from "react-redux";
import { chapterService } from "services";
import { createChapterFormValidation } from "validations";

function CreateChapter() {
  const dispatch = useDispatch();
  const { titleId } = useParams();
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
    dispatch(setLoading(true));

    const params = {
      ...values,
      titleId,
    };

    chapterService
      .add(params)
      .then(() => {
        toastEmitter("Truyện đã được thêm thành công", "success");
        fetchData();
        resetForm();
      })
      .catch((error) => {
        toastEmitter(error, "error");
      });

    dispatch(setLoading(false));
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
      {popup.isShown && <Popup data={popup} setShow={triggerPopup} />}
      <Toast {...toastOptions} />
    </>
  );
}

export default CreateChapter;
