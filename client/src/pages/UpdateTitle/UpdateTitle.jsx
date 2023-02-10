import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { FormWrapper, TitleForm } from "components";
import { Popup, ProgressCircle } from "features";
import { useToast } from "hooks";
import { updateTitleFormValidation } from "validations/updateTitleForm.validation";
import { titleService } from "services";

function UpdateTitle() {
  const { titleId } = useParams();
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState({});
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "Thay đổi thành công",
  });
  const hasData = Object.keys(title).length > 0;
  const INITIAL_VALUE = hasData && {
    title: title.title,
    summary: title.summary,
    status_id: title.status_id,
    release_day: title.release_day,
    genres: title.genres,
    author: title.author,
    coin: `${title.coin}`,
    cover: title.cover.source,
    // TODO largeCover: title.cover.source,
  };

  const fetchData = () => {
    titleService
      .getOne(titleId)
      .then((response) => {
        setTitle(response.data);
      })
      .catch((error) => console.error(error));
  };

  const handleUpdate = (values) => {
    const data = { ...values, guid: title._guid };
    if (values.cover) data.oldCover = title.cover;

    titleService
      .update(titleId, data, setProgress)
      .then((response) => {
        toastEmitter(response.message, "success");
        setProgress(0);
      })
      .catch((error) => {
        toastEmitter(error, "error");
        setProgress(0);
      });
  };

  const getChangedValues = (values) => {
    const valueKeys = Object.keys(values);

    const changedValues = valueKeys.reduce((obj, key) => {
      if (JSON.stringify(values[key]) !== JSON.stringify(INITIAL_VALUE[key])) {
        return { ...obj, [key]: values[key] };
      }
      return obj;
    }, {});

    return changedValues;
  };

  const handleCancel = () => {
    setPopup((prev) => ({
      ...prev,
      trigger: true,
      content: "Bạn có chắc muốn quay lại?",
    }));
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const changedValues = getChangedValues(values);
    console.log("file: UpdateTitle.jsx:81 ~ changedValues", changedValues);
    Object.keys(changedValues).length > 0 && handleUpdate(changedValues);
    setSubmitting(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <FormWrapper title="Chỉnh sửa truyện">
        {hasData && (
          <TitleForm
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            initialValues={INITIAL_VALUE}
            imageBlob={{
              cover: title.cover.source,
              largeCover: title.cover.source,
            }}
            validationSchema={updateTitleFormValidation}
            toastEmitter={toastEmitter}
          />
        )}
      </FormWrapper>
      <ProgressCircle percentage={progress} />
      <Popup popup={popup} setPopup={setPopup} />
      <Toast {...toastOptions} />
    </>
  );
}

export default UpdateTitle;
