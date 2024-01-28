import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { FormWrapper, TitleForm } from "components";
import { Popup } from "features";
import { usePopup, useToast } from "hooks";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useDispatch } from "react-redux";
import { titleService } from "services";
import { updateTitleFormValidation } from "validations/updateTitleForm.validation";

function UpdateTitle() {
  const dispatch = useDispatch();
  const { titleId } = useParams();
  const [title, setTitle] = useState({});
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const { popup, setPopup, triggerPopup } = usePopup();
  const hasData = Object.keys(title).length > 0;
  const INITIAL_VALUE = hasData && {
    title: title.title,
    summary: title.summary,
    status_id: title.status_id.code,
    release_day: title.release_day,
    genres: title.genres,
    author: title.author,
    coin: `${title.coin}`,
    cover: title.cover.source,
    // TODO largeCover: title.cover.source,
  };

  const handleUpdate = (values) => {
    dispatch(setLoading(true));

    const data = { ...values, guid: title._guid };
    if (values.cover) data.oldCover = title.cover;

    titleService
      .update(titleId, data)
      .then((response) => {
        toastEmitter(response.message, "success");
      })
      .catch((error) => {
        toastEmitter(error, "error");
      });

    dispatch(setLoading(false));
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

  useEffect(() => {
    const params = {
      _id: titleId,
      _fields: "title status_id genres summary author coin release_day cover",
      _embed: JSON.stringify([{ collection: "status_id", fields: "-_id code" }]),
    };

    titleService
      .getOne(params)
      .then((response) => {
        setTitle(response.data);
      })
      .catch((error) => toastEmitter(error, "error"));
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
      <Popup data={popup} trigger={triggerPopup} />
      <Toast {...toastOptions} />
    </>
  );
}

export default UpdateTitle;
