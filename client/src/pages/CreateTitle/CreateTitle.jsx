import { FormWrapper, TitleForm } from "components";
import { Popup } from "features";
import { useAddTitle, usePopup } from "hooks";
import { createTitleFormValidation } from "validations/createTitleForm.validation";

function CreateTitle() {
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
  const { add } = useAddTitle();

  const handleCancel = () => {
    setPopup({
      isTriggered: true,
      title: "Thông báo",
      content: "Bạn có chắc muốn hủy bỏ?",
    });
  };

  const handleSubmit = (values, { setSubmitting }) => {
    values.author = !!values.author ?? "Đang cập nhật";
    add(values);
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
      <Popup data={popup} trigger={triggerPopup} />
    </>
  );
}

export default CreateTitle;
