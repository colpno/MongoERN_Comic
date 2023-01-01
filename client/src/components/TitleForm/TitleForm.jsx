import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { Alert } from "react-bootstrap";

import { InputImage, Button } from "components";
import { CheckBoxGroup, InputField, RadioGroup, TextAreaField, FormLabel } from "libs/formik";
import { genreService } from "services";
import { getReleaseDayOptions } from "utils";
import styles from "./TitleForm.module.scss";

const cx = classNames.bind(styles);

function TitleForm({ initialValues, validationSchema, handleCancel, handleSubmit, imageBlob }) {
  const [genres, setGenres] = useState([]);
  // TODO const [approvedStatuses, setApprovedStatuses] = useState([]);
  const releaseDayOptions = getReleaseDayOptions();

  const genreOptions = useMemo(
    () =>
      genres.map((genre) => {
        return { value: `${genre.name}`, label: genre.name };
      }),
    [genres]
  );

  const statusOptions = [
    { value: "vis", label: "Lưu hành" },
    { value: "inv", label: "Tạm ẩn" },
  ];

  const handleRemove = (value) => {
    console.log(value);
  };

  useEffect(() => {
    genreService
      .getAll()
      .then((response) => setGenres(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, setFieldValue }) => {
        return (
          <Form>
            <FormLabel name="title" label="Tiêu đề truyện" required />
            <FastField
              name="title"
              component={InputField}
              placeholder="Nhập tiêu đề truyện..."
              maxLength={255}
              letterCount
              autoFocus
            />

            {statusOptions.length > 0 && (
              <>
                <FormLabel name="status" label="Trạng thái" />
                <FastField
                  name="status"
                  component={RadioGroup}
                  options={statusOptions}
                  col={{ xs: 6 }}
                />
              </>
            )}

            {genreOptions.length > 0 && (
              <>
                <FormLabel name="genres" label="Thể loại" subLabel="Tối đa 3 thể loại" required />
                <FastField
                  name="genres"
                  component={CheckBoxGroup}
                  options={genreOptions}
                  col={{ xs: 6, md: 4 }}
                />
              </>
            )}

            <FormLabel name="summary" label="Mô tả" required />
            <FastField
              name="summary"
              component={TextAreaField}
              placeholder="Viết giới thiệu truyện..."
              rows={7}
            />

            <FormLabel name="author" label="Tác giả" required />
            <FastField
              name="author"
              component={InputField}
              placeholder="Nhập tên tác giả..."
              maxLength={255}
              letterCount
            />

            <FormLabel
              name="coin"
              label="Coin"
              subLabel="Coin của tất cả chương thuộc truyện"
              required
            />
            <FastField
              name="coin"
              component={InputField}
              placeholder="Nhập coin..."
              maxLength={3}
              letterCount
            />

            <FormLabel name="release_day" label="Ngày đăng hàng tuần" required />
            <FastField
              name="release_day"
              component={RadioGroup}
              options={releaseDayOptions}
              col={{ xs: 6, md: 4 }}
            />

            <FormLabel name="cover" label="Ảnh bìa" required />
            {!!errors.cover && <Alert variant="danger">{errors.cover}</Alert>}
            {/* TODO: {!!errors.largeCover&& (
              <Alert variant="danger">{errors.largeCover}</Alert>
            )} */}
            <div className={cx("cover-image")}>
              <FastField
                name="cover"
                component={InputImage}
                imgSize={{ width: 275, height: 275 }}
                imageBlob={imageBlob?.cover ? imageBlob.cover : null}
                removable
                handleRemove={handleRemove}
                setFieldValue={setFieldValue}
              />
              {/* TODO: <FastField
                name="largeCover"
                component={FileField}
                imgSize={{ width: 516, height: 306 }}
                imageBlob={imageBlob?.largeCover ? imageBlob.largeCover : null}
                closeIcon={!!imageBlob?.cover}
                handleRemove={handleRemove}
              /> */}
            </div>

            <div className={cx("button-group")}>
              <Button outline grey onClick={handleCancel}>
                Hủy bỏ
              </Button>
              <div className={cx("button-group__submit-group")}>
                <Button outline type="submit">
                  Lưu bản nháp
                </Button>
                <Button primary type="submit">
                  Lưu & đăng truyện
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

TitleForm.propTypes = {
  initialValues: PropTypes.shape({
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    title_status_id: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    cover: PropTypes.string.isRequired,
    // TODO: largeCover: PropTypes.string.isRequired,
    coin: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    release_day: PropTypes.string.isRequired,
  }).isRequired,
  validationSchema: PropTypes.shape({}).isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  imageBlob: PropTypes.shape({
    cover: PropTypes.string,
    largeCover: PropTypes.string,
  }),
};

TitleForm.defaultProps = {
  imageBlob: {},
};

export default TitleForm;
