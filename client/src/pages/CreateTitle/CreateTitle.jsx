/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FormWrapper, TitleForm } from "components";
import { Popup, ProgressCircle } from "features";
import { useToast } from "hooks";
import { titleService } from "services";
import { createTitleFormValidation } from "validations/createTitleForm.validation";

function CreateTitle() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const [popup, setPopup] = useState({
    trigger: false,
    isConfirm: false,
    title: "Thông báo",
    content: "",
  });

  const INITIAL_VALUE = {
    title: "",
    status_id: "",
    genres: [],
    summary: "",
    author: "",
    coin: "",
    cover: "",
    release_day: "",
    // TODO largeCoverTemp: "",
  };

  const handleCancel = () => {
    setPopup((prev) => ({
      ...prev,
      trigger: true,
      content: "Bạn có chắc muốn quay lại?",
    }));
  };

  useEffect(() => {
    popup.isConfirm && navigate(-1);
  }, [popup.isConfirm]);

  const handleSubmit = (values, { setSubmitting }) => {
    const { title, cover, author, summary, genres, coin, release_day: releaseDay } = values;

    titleService
      .add(title, cover, author, summary, genres, coin, releaseDay, setProgress)
      .then((response) => {
        toastEmitter(response.message, "success");
        setProgress(0);
      })
      .catch((error) => {
        toastEmitter(error, "error");
        setProgress(0);
      });

    setSubmitting(false);
  };

  return (
    <>
      <FormWrapper title="Thêm truyện mới">
        <TitleForm
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          initialValues={INITIAL_VALUE}
          validationSchema={createTitleFormValidation}
        />
      </FormWrapper>
      <ProgressCircle percentage={progress} />
      <Popup yesno popup={popup} setPopup={setPopup} />
      <Toast {...toastOptions} />
    </>
  );
}

export default CreateTitle;
