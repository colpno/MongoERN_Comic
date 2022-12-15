import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FormWrapper from "components/FormWrapper/FormWrapper";
import TitleForm from "components/TitleForm";
import { Popup, ProgressCircle } from "features";
import { useToast } from "hooks";
import { addTitle } from "services/title";
import { createTitleFormValidation } from "validations/createTitleFormValidation";

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
    name: "",
    genreId: [],
    summary: "",
    author: "",
    coin: "",
    cover: "",
    releaseDay: "",
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
    addTitle(values, setProgress)
      .then((response) => {
        if (response.affectedRows > 0) {
          toastEmitter("Truyện đã được thêm thành công", "success");
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
