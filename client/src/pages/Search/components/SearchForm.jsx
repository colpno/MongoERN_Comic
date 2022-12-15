import { FastField, Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import { Button } from "components";
import { CheckBoxGroup, InputField, RadioGroup } from "libs/formik";

function SearchForm({
  initialValues,
  handleSubmit,
  cx,
  genreOptions,
  sortOptions,
  orderOption,
}) {
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => {
        return (
          <Form>
            <Row>
              <Col md={2} className={cx("label")}>
                Thể loại:
              </Col>
              <Col md={10}>
                {genreOptions.length > 0 && (
                  <FastField
                    name="genreId"
                    component={CheckBoxGroup}
                    options={genreOptions}
                    col={{
                      xs: 6,
                      md: 3,
                      lg: 2,
                    }}
                  />
                )}
              </Col>
            </Row>
            <Row className={cx("author-row")}>
              <Col md={2} className={cx("label")}>
                Tên tác giả:
              </Col>
              <Col md={10}>
                <FastField
                  name="author"
                  component={InputField}
                  placeholder="Nhập tên tác giả..."
                />
              </Col>
            </Row>
            <Row>
              <Col md={2} className={cx("label")}>
                Sắp xếp
              </Col>
              <Col md={10}>
                <FastField
                  name="sort"
                  component={RadioGroup}
                  options={sortOptions}
                  col={{
                    md: 3,
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col md={2} className={cx("label")} />
              <Col md={10} className={cx("order-row")}>
                <FastField
                  name="order"
                  component={RadioGroup}
                  options={orderOption}
                  col={{
                    md: 3,
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col className={cx("button-container")}>
                <Button primary type="submit">
                  Tìm
                </Button>
              </Col>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
}

SearchForm.propTypes = {
  initialValues: PropTypes.shape({
    genreId: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    author: PropTypes.string.isRequired,
    sort: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  cx: PropTypes.func.isRequired,
  genreOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  orderOption: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default SearchForm;
