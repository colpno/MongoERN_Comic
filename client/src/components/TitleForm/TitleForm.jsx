import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

import Button from "components/Button";
import { CheckBoxGroup, InputField, TextAreaField } from "libs/formik";
import FileField from "libs/formik/FileField";
import FormLabel from "libs/formik/FormLabel";
import { getAllGenres } from "services/genre";
import titleStatusServices from "services/titleStatusServices";
import styles from "./assets/styles/TitleForm.module.scss";

const cx = classNames.bind(styles);

function TitleForm({
  initialValues,
  validationSchema,
  handleSubmit,
  imageBlob,
}) {
  const { genres } = getAllGenres();
  const options = genres.map((genre) => {
    return { value: `${genre.id}`, label: genre.genre };
  });
  // eslint-disable-next-line no-unused-vars
  const { titleStatuses } = titleStatusServices();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors }) => {
        return (
          <Form>
            <FormLabel name="title" label="Tiêu đề truyện" required />
            <FastField
              name="title"
              component={InputField}
              placeholder="Nhập tiêu đề truyện..."
              maxLength={255}
              letterCount
            />

            {/* {titleStatuses && (
              <>
                <FormLabel name="titleStatusId" label="Trạng thái" />
                <FastField
                  name="titleStatusId"
                  component={RadioGroup}
                  options={titleStatuses}
                  col={{ sm: 6, md: 4 }}
                />
              </>
            )} */}

            {options && (
              <>
                <FormLabel
                  name="genreId"
                  label="Thể loại"
                  subLabel="Tối đa 3 thể loại"
                  required
                />
                <FastField
                  name="genreId"
                  component={CheckBoxGroup}
                  options={options}
                  col={{ sm: 6, md: 4 }}
                />
              </>
            )}

            <FormLabel name="summary" label="Mô tả" required />
            <FastField
              name="summary"
              component={TextAreaField}
              placeholder="Viết giới thiệu truyện..."
            />

            {/* TODO: close icon to destroy image */}
            <FormLabel name="coverImageTemp" label="Ảnh bìa" required />
            {!!errors.coverImage && (
              <Alert variant="danger">{errors.coverImage}</Alert>
            )}
            {!!errors.largeCoverImage && (
              <Alert variant="danger">{errors.largeCoverImage}</Alert>
            )}
            <div className={cx("cover-image")}>
              <FastField
                name="coverImageTemp"
                component={FileField}
                imgSize={{ width: 275, height: 275 }}
                imageBlob={imageBlob?.coverImage ? imageBlob.coverImage : null}
              />
              <FastField
                name="largeCoverImageTemp"
                component={FileField}
                imgSize={{ width: 516, height: 306 }}
                imageBlob={
                  imageBlob?.largeCoverImage ? imageBlob.largeCoverImage : null
                }
              />
            </div>

            {"email" in initialValues && (
              <>
                <FormLabel name="email" label="Xác nhận email" required />
                <div className={cx("email-field")}>
                  <FastField
                    name="email"
                    component={InputField}
                    placeholder="Nhập email..."
                  />
                  <Button outline>Gửi email</Button>
                </div>
              </>
            )}

            <div className={cx("button-group")}>
              <Button outline gray>
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
    // titleStatusId: PropTypes.string.isRequired,
    genreId: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    coverImageTemp: PropTypes.string.isRequired,
    largeCoverImageTemp: PropTypes.string.isRequired,
    email: PropTypes.string,
  }).isRequired,
  validationSchema: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  imageBlob: PropTypes.shape({
    coverImage: PropTypes.string,
    largeCoverImage: PropTypes.string,
  }),
};

TitleForm.defaultProps = {
  imageBlob: {},
};

export default TitleForm;
