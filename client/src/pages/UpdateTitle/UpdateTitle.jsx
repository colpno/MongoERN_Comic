import classNames from "classnames/bind";
import { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import TitleForm from "components/TitleForm";
import { Popup, ProgressCircle } from "features";
import { getTitleByID, updateTitle } from "services/title";
import { getAllTitleGenreByProperty } from "services/titleGenre";
import styles from "./UpdateTitle.module.scss";

const cx = classNames.bind(styles);

function UpdateTitle() {
  const { titleId } = useParams();
  const [progress, setProgress] = useState(0);
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
    // email: Yup.string()
    //   .email("Sai định dạng email.")
    //   .required("Nhập email để xác nhận."),
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
          console.log("file: UpdateTitle.jsx ~ line 96 ~ response", response);
          if (response.affectedRows > 0) {
            setPopup((prev) => ({
              ...prev,
              trigger: true,
              content: "Thay đổi thành công",
            }));
            setProgress(0);
          }
        })
        .catch((error) => {
          console.log("file: UpdateTitle.jsx ~ line 100 ~ error", error);
        });

    setSubmitting(false);
  };

  return (
    <>
      <div className={cx("update-title")}>
        <h3 className={cx("head-title")}>Chỉnh sửa truyện</h3>
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
      </div>
      <ProgressCircle percentage={progress} />
      <Popup popup={popup} setPopup={setPopup} />
    </>
  );
}

export default UpdateTitle;
