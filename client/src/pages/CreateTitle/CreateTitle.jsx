import classNames from "classnames/bind";
import { useState } from "react";
import * as Yup from "yup";

import TitleForm from "components/TitleForm";
import { Popup, ProgressCircle } from "features";
import { useToast } from "hooks";
import { addTitle } from "services/title";
import styles from "./CreateTitle.module.scss";

const cx = classNames.bind(styles);

function CreateTitle() {
  const [progress, setProgress] = useState(0);
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "",
  });

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

  const INITIAL_VALUE = {
    name: "",
    genreId: [],
    summary: "",
    author: "",
    coin: "",
    cover: "",
    releaseDay: "",
    // largeCoverTemp: "",
  };

  const VALIDATION_SCHEMA = Yup.object({
    name: Yup.string()
      .max(255, "Giới hạn độ dài là 255 ký tự.")
      .required("Tiêu đề truyện không được để trống."),
    genreId: Yup.array()
      .min(1, "Truyện cần phải có tối thiểu 1 thể loại.")
      .max(3, "Truyện có tối đa 3 thể loại.")
      .of(Yup.string()),
    summary: Yup.string()
      .max(1000, "Giới hạn độ dài là 1000 ký tự.")
      .required("Mô tả không được để trống."),
    author: Yup.string()
      .max(255, "Giới hạn độ dài là 255 ký tự.")
      .required("Tác giả không được để trống."),
    coin: Yup.string()
      .max(3, "Giới hạn độ dài là 3 ký tự.")
      .required("Coin không được để trống."),
    releaseDay: Yup.string().required(
      "Ngày đăng hàng tuần phải không được để trống"
    ),
    cover: Yup.string().required("Ảnh bìa không được để trống."),
    // largeCoverTemp: Yup.string().required("Truyện cần phải có ảnh bìa."),
  });

  return (
    <>
      <div className={cx("create-title")}>
        <h3 className={cx("head-title")}>Thêm truyện mới</h3>
        <TitleForm
          handleSubmit={handleSubmit}
          initialValues={INITIAL_VALUE}
          validationSchema={VALIDATION_SCHEMA}
        />
      </div>
      <ProgressCircle percentage={progress} />
      <Popup popup={popup} setPopup={setPopup} />
      <Toast {...toastOptions} />
    </>
  );
}

export default CreateTitle;
