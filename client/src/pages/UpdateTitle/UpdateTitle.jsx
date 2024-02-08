import { useParams } from "react-router-dom";

import { FormWrapper, TitleForm } from "components";
import { Popup } from "features";
import { useGetTitle, usePopup, useUpdateTitle } from "hooks";
import { updateTitleFormValidation } from "validations/updateTitleForm.validation";

function UpdateTitle() {
  const { titleId } = useParams();
  const { data: title = {} } = useGetTitle({
    params: {
      _id: titleId,
    },
    isPrivate: true,
  });
  const { popup, setPopup, triggerPopup } = usePopup();
  const hasData = Object.keys(title).length > 0;
  const INITIAL_VALUE = {
    title: title?.title ?? "",
    summary: title?.summary ?? "",
    status_id: title?.status_id ?? "",
    release_day: title?.release_day ?? "",
    genres: title?.genres ?? [],
    author: title?.author ?? "",
    coin: `${title?.coin}` ?? "",
    cover: title?.cover?.source ?? "",
  };
  const { update: updateTitle } = useUpdateTitle();

  const handleUpdate = (values) => {
    const data = { ...values, guid: title._guid };
    if (values.cover) data.oldCover = title.cover;

    updateTitle({ id: titleId, data });
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
    setPopup({
      isTriggered: true,
      title: "Thông báo",
      content: "Bạn có chắc muốn quay lại?",
    });
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const changedValues = getChangedValues(values);
    Object.keys(changedValues).length > 0 && handleUpdate(changedValues);
    setSubmitting(false);
  };

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
          />
        )}
      </FormWrapper>
      <Popup data={popup} trigger={triggerPopup} />
    </>
  );
}

export default UpdateTitle;
