import { FormWrapper, TitleForm } from "components";
import { Popup } from "features";
import { usePopup, useToast } from "hooks";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useDispatch } from "react-redux";
import { titleService } from "services";
import { createTitleFormValidation } from "validations/createTitleForm.validation";

function CreateTitle() {
  const dispatch = useDispatch();
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
    dispatch(setLoading(true));

    titleService
      .add(values)
      .then((response) => {
        toastEmitter(response.message, "success");
      })
      .catch((error) => {
        toastEmitter(error, "error");
      });

    dispatch(setLoading(false));
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
      {popup.isShown && <Popup data={popup} setShow={triggerPopup} />}
      <Toast {...toastOptions} />
    </>
  );
}

export default CreateTitle;
