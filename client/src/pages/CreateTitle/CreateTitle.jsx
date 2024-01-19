import { useState } from "react";

import { FormWrapper, TitleForm } from "components";
import { Popup, ProgressCircle } from "features";
import { usePopup, useToast } from "hooks";
import { titleService } from "services";
import { createTitleFormValidation } from "validations/createTitleForm.validation";

function CreateTitle() {
  const [progress, setProgress] = useState(0);
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const { popup, setPopup, triggerPopup } = usePopup();

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
    setPopup({
      isShown: true,
      title: "Thông báo",
      content: "Bạn có chắc muốn hủy bỏ?",
    });
  };

  const handleSubmit = (values, { setSubmitting }) => {
    titleService
      .add(values, setProgress)
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
          toastEmitter={toastEmitter}
        />
      </FormWrapper>
      <ProgressCircle percentage={progress} />
      {popup.isShown && <Popup data={popup} setShow={triggerPopup} />}
      <Toast {...toastOptions} />
    </>
  );
}

export default CreateTitle;
