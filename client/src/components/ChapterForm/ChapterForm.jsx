/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";
import { Alert } from "react-bootstrap";

import { Image } from "components";
import Button from "components/Button";
import { InputField, TextAreaField } from "libs/formik";
import FileField from "libs/formik/FileField";
import FormLabel from "libs/formik/FormLabel";
import { IoCloseCircle } from "react-icons/io5";
import styles from "./assets/ChapterForm.module.scss";
import InputMultiFile from "./components/InputMultiFile";

const cx = classNames.bind(styles);

function ChapterForm({
  initialValues,
  validationSchema,
  handleSubmit,
  imageBlob,
}) {
  const [imagesPreview, setImagesPreview] = useState([...imageBlob.contents]);

  // Formik onchange not worked in multiple file input
  const handleImagePreview = (e, setFieldValue) => {
    const { files } = e.target;
    const fileArray = Array.from(files);
    const images = fileArray.map((file) => URL.createObjectURL(file));
    setImagesPreview((prev) => prev.concat(images));

    // assign to contentsFake will cause "HTTPInputElement" error
    // so instead of assign to contentsFake, assign to contents
    setFieldValue("contents", [...imagesPreview, ...images]);
  };

  const onCloseIconClick = (e) => {
    console.log(e);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, errors }) => {
        return (
          <Form>
            <FormLabel name="order" label="Thứ tự chương" />
            <FastField name="order" component={InputField} disabled />

            <FormLabel name="titleName" label="Tiêu đề chương" required />
            <FastField
              name="titleName"
              component={InputField}
              placeholder="Nhập tiêu đề chương..."
              maxLength={255}
              letterCount
            />

            <FormLabel name="coverImageFake" label="Ảnh bìa" required />
            {!!errors.coverImageFake && (
              <Alert variant="danger">{errors.coverImageFake}</Alert>
            )}
            <div className={cx("cover-image-field")}>
              <FastField
                name="coverImageFake"
                component={FileField}
                imgSize={{ width: 312, height: 232 }}
                imageBlob={imageBlob?.coverImage}
                closeIcon={!!imageBlob?.coverImage}
                handleCloseIconClick={onCloseIconClick}
              />
            </div>

            <FormLabel name="contentsFake" label="Nội dung chương" required />
            <div className={cx("contents-field")}>
              <FastField
                name="contentsFake"
                component={InputMultiFile}
                handleImagePreview={(e) => {
                  handleImagePreview(e, setFieldValue);
                }}
                multiple
                imgSize={{ width: 690 }}
                fileSize={3}
              />
            </div>
            <div className={cx("contents-holder")}>
              {imagesPreview.map((content, index) => {
                return (
                  <div className={cx("content-wrapper")} key={index}>
                    <Image
                      src={content}
                      alt=""
                      key={index}
                      className={cx("image-content")}
                    />
                    <IoCloseCircle
                      className={cx("close-icon")}
                      onClick={() => {
                        const elem = initialValues.contents.indexOf(content);
                        console.log(initialValues.contents[elem]);
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <FormLabel name="authorNote" label="Lời nhắn của tác giả" />
            <FastField
              name="authorNote"
              component={TextAreaField}
              placeholder="Viết lời nhắn của bạn..."
              maxLength={500}
            />

            <FormLabel name="schedule" label="Đặt lịch đăng chương" />
            <FastField
              name="schedule"
              component={InputField}
              placeholder="dd/mm/yyyy hh:mm:ss"
            />

            <div className={cx("button-group")}>
              <Button outline gray>
                Hủy bỏ
              </Button>
              <div className={cx("button-group__submit-group")}>
                <Button outline type="submit">
                  Lưu bản nháp
                </Button>
                <Button primary type="submit">
                  Lưu & đăng chương
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

ChapterForm.propTypes = {
  initialValues: PropTypes.shape({
    order: PropTypes.string.isRequired,
    titleName: PropTypes.string.isRequired,
    coverImageFake: PropTypes.string.isRequired,
    contents: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    contentsFake: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    authorNote: PropTypes.string.isRequired,
    schedule: PropTypes.string.isRequired,
  }).isRequired,
  validationSchema: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  imageBlob: PropTypes.shape({
    coverImage: PropTypes.string,
    contents: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
};

ChapterForm.defaultProps = {
  imageBlob: {
    contents: [],
  },
};

export default ChapterForm;
