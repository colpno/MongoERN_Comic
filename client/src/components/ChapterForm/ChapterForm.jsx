import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { memo, useState } from "react";
import { Alert } from "react-bootstrap";

import { Image, InputImage } from "components";
import Button from "components/Button";
import { InputField, RadioGroup } from "libs/formik";
import FormLabel from "libs/formik/FormLabel";
import { IoCloseCircle } from "react-icons/io5";
import styles from "./assets/ChapterForm.module.scss";
import InputMultiFile from "./components/InputMultiFile";

const cx = classNames.bind(styles);

function ChapterForm({ initialValues, validationSchema, handleSubmit }) {
  const [blobs, setBlobs] = useState(
    initialValues.images ? [...initialValues.images] : []
  );

  const costOptions = [
    { value: "false", label: "Miễn phí" },
    { value: "true", label: "Trả phí" },
  ];

  const onCloseIconClick = (e) => {
    console.log(e);
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

            <FormLabel name="name" label="Tiêu đề chương" required />
            <FastField
              name="name"
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
                handleRemove={onCloseIconClick}
                setFieldValue={setFieldValue}
              />
            </div>

            <FormLabel name="images" label="Nội dung chương" required />
            {!!errors.images && <Alert variant="danger">{errors.images}</Alert>}
            <div className={cx("contents-field")}>
              <FastField
                name="images"
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
                      onClick={() => {
                        const blobTemp = [...blobs];
                        blobTemp.splice(index, 1);
                        setBlobs(blobTemp);

                        const dataTemp = [...values.images];
                        dataTemp.splice(index, 1);
                        setFieldValue("images", dataTemp);
                      }}
                    />
                  </div>
                );
              })}
            </div>
            {/* 
            <FormLabel name="authorNote" label="Lời nhắn của tác giả" />
            <FastField
              name="authorNote"
              component={TextAreaField}
              placeholder="Viết lời nhắn của bạn..."
              maxLength={500}
            /> */}

            {/* <FormLabel name="schedule" label="Đặt lịch đăng chương" />
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
    name: PropTypes.string.isRequired,
    cost: PropTypes.string.isRequired,
    cover: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
  validationSchema: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default memo(ChapterForm);
