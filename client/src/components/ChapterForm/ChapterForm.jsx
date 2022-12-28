import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { memo, useState } from "react";
import { Alert } from "react-bootstrap";
import { IoCloseCircle } from "react-icons/io5";

import { Image, InputImage, Button } from "components";
import { FormLabel, InputField, RadioGroup } from "libs/formik";
import styles from "./styles/ChapterForm.module.scss";
import InputMultiFile from "./components/InputMultiFile";

const cx = classNames.bind(styles);

function ChapterForm({ initialValues, validationSchema, handleSubmit }) {
  const [blobs, setBlobs] = useState(
    initialValues.contents ? [...initialValues.contents] : []
  );

  const costOptions = [
    { value: "false", label: "Miễn phí" },
    { value: "true", label: "Trả phí" },
  ];

  const handleCloseIconClick = (values, index, setFieldValue) => {
    const blobTemp = [...blobs];
    blobTemp.splice(index, 1);
    setBlobs(blobTemp);

    const dataTemp = [...values.contents];
    dataTemp.splice(index, 1);
    setFieldValue("contents", dataTemp);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue, errors }) => {
        return (
          <Form>
            <FormLabel name="order" label="Thứ tự chương" />
            <FastField name="order" component={InputField} disabled />

            <FormLabel name="title" label="Tiêu đề chương" required />
            <FastField
              name="title"
              component={InputField}
              placeholder="Nhập tiêu đề chương..."
              maxLength={255}
              letterCount
              autoFocus
            />

            {costOptions.length > 0 && (
              <>
                <FormLabel name="cost" label="Trả phí" required />
                <FastField
                  name="cost"
                  component={RadioGroup}
                  options={costOptions}
                  col={{ xs: 6 }}
                />
              </>
            )}

            <FormLabel name="cover" label="Ảnh bìa" required />
            {!!errors.cover && <Alert variant="danger">{errors.cover}</Alert>}
            <div className={cx("cover-image-field")}>
              <FastField
                name="cover"
                component={InputImage}
                imgSize={{ width: 312, height: 232 }}
                removable
                handleRemove={handleCloseIconClick}
                setFieldValue={setFieldValue}
              />
            </div>

            <FormLabel name="contents" label="Nội dung chương" required />
            {!!errors.contents && (
              <Alert variant="danger">{errors.contents}</Alert>
            )}
            <div className={cx("contents-field")}>
              <FastField
                name="contents"
                component={InputMultiFile}
                blobs={blobs}
                setBlobs={setBlobs}
                setFieldValue={setFieldValue}
                multiple
                imgSize={{ width: 690 }}
                fileSize={3}
              />
            </div>
            <div className={cx("contents-holder")}>
              {blobs.map((blob, index) => {
                return (
                  <div className={cx("content-wrapper")} key={index}>
                    <Image
                      src={blob}
                      alt={`Image ${index + 1}`}
                      key={index}
                      className={cx("image-content")}
                    />
                    <IoCloseCircle
                      className={cx("close-icon")}
                      onClick={() =>
                        handleCloseIconClick(values, index, setFieldValue)
                      }
                    />
                  </div>
                );
              })}
            </div>

            {/* TODO <FormLabel name="authorNote" label="Lời nhắn của tác giả" />
            <FastField
              name="authorNote"
              component={TextAreaField}
              placeholder="Viết lời nhắn của bạn..."
              maxLength={500}
            /> */}

            {/* TODO <FormLabel name="schedule" label="Đặt lịch đăng chương" />
            <FastField
              name="schedule"
              component={InputField}
              placeholder="dd/mm/yyyy hh:mm:ss"
            /> */}

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
    title: PropTypes.string.isRequired,
    cost: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    contents: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
  validationSchema: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default memo(ChapterForm);
