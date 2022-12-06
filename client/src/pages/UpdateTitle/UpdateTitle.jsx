import { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import FormWrapper from "components/FormWrapper/FormWrapper";
import TitleForm from "components/TitleForm";
import { Popup, ProgressCircle } from "features";
import { useToast } from "hooks";
import { getTitleByID, updateTitle } from "services/title";
import { getAllTitleGenreByProperty } from "services/titleGenre";

function UpdateTitle() {
  const { titleId } = useParams();
  const [progress, setProgress] = useState(0);
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "Thay đổi thành công",
  });
  const { title } = getTitleByID(titleId);
  const { titleGenres } = getAllTitleGenreByProperty({ titleId });
  const hasData = Object.keys(title).length > 0 && titleGenres.length > 0;

  const INITIAL_VALUE = hasData && {
    name: title.name,
    summary: title.summary,
    titleStatusId: `${title.approvedStatusId}`,
    releaseDay: title.releaseDay,
    genreId:
      titleGenres.length > 0
        ? titleGenres.map((genre) => {
            return `${genre.genreId}`;
          })
        : [""],
    author: title.author,
    coin: title.coin,
    cover: title.cover,
    largeCover: title.cover,
  };

  const VALIDATION_SCHEMA = Yup.object({
    name: Yup.string()
      .max(255, "Giới hạn độ dài của tiêu đề là 255 ký tự.")
      .required("Truyện cần phải có tiêu đề."),
    summary: Yup.string()
      .max(1000, "Giới hạn độ dài của mô tả là 1000 ký tự.")
      .required("Truyện cần phải có mô tả."),
    titleStatusId: Yup.string().required(
      "Vui lòng chọn trạng thái của truyện."
    ),
    author: Yup.string()
      .max(255, "Giới hạn độ dài là 255 ký tự.")
      .required("Tác giả không được để trống."),
    genreId: Yup.array()
      .min(1, "Truyện cần phải có tối thiểu 1 thể loại.")
      .max(3, "Truyện có tối đa 3 thể loại.")
      .of(Yup.string()),
    releaseDay: Yup.string().required(
      "Ngày đăng hàng tuần phải không được để trống"
    ),
    cover: Yup.string().required("Truyện cần phải có ảnh bìa mặc định."),
    largeCover: Yup.string().required("Truyện cần phải có ảnh bìa."),
    coin: Yup.string()
      .max(3, "Giới hạn độ dài là 3 ký tự.")
      .required("Truyện cần phải có số coin mặc định cho tất cả chương."),
    /* TODO
     email: Yup.string()
       .email("Sai định dạng email.")
       .required("Nhập email để xác nhận."),
    */
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const valueKeys = Object.keys(values);
    const changedValues = valueKeys.reduce((obj, key) => {
      if (JSON.stringify(values[key]) !== JSON.stringify(INITIAL_VALUE[key])) {
        return { ...obj, [key]: values[key] };
      }
      return obj;
    }, {});

    Object.keys(changedValues).length > 0 &&
      updateTitle(
        titleId,
        {
          oldCover: INITIAL_VALUE.cover.slice(
            INITIAL_VALUE.cover.indexOf("comic"),
            INITIAL_VALUE.cover.lastIndexOf(".")
          ),
          newValues: changedValues,
        },
        setProgress
      )
        .then((response) => {
          if (response.affectedRows > 0) {
            toastEmitter("Truyện đã được thay đổi thành công", "success");
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
      <FormWrapper title="Chỉnh sửa truyện">
        {hasData && (
          <TitleForm
            handleSubmit={handleSubmit}
            initialValues={INITIAL_VALUE}
            imageBlob={{
              cover: title.cover,
              largeCover: title.cover,
            }}
            validationSchema={VALIDATION_SCHEMA}
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
