/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";

import { Button, CardList, Input } from "components";
import { NoData, Pagination } from "features";
import { CheckBoxGroup, RadioGroup } from "libs/formik";
import { getAllGenres } from "services/genre";
import { filterTitles } from "services/title";
import { isEmpty } from "utils";
import styles from "./styles/Search.module.scss";

const cx = classNames.bind(styles);

function Search() {
  const [initialValues, setInitialValues] = useState({
    genreId: [],
    author: "",
    sort: "updatedAt",
    order: "desc",
  });
  const {
    titles,
    pagination,
    setPagination,
    fetch: callFilterTitles,
  } = filterTitles(
    { name: "" },
    {
      sort: initialValues.sort,
      order: initialValues.order,
    },
    35
  );
  const { genres } = getAllGenres();

  const genreOptions = genres.map((genre) => ({
    value: genre.guid,
    label: genre.name,
  }));

  const sortOptions = [
    { value: "updatedAt", label: "Ngày cập nhật" },
    { value: "name", label: "Tên truyện" },
    { value: "totalChapter", label: "Số chương" },
    { value: "like", label: "Lượt thích" },
    { value: "view", label: "Lượt xem" },
  ];

  const orderOption = [
    { value: "asc", label: "Tăng dần" },
    { value: "desc", label: "Giảm dần" },
  ];

  const handleSubmit = (values, { setSubmitting }) => {
    const valueKeys = Object.keys(values);

    const checkedValues = valueKeys.reduce((obj, key) => {
      if (isEmpty(values[key])) {
        return obj;
      }
      return { ...obj, [key]: values[key] };
    }, {});

    const allChecked =
      Object.keys(checkedValues).length !== Object.keys(initialValues) ||
      initialValues.sort !== values.sort ||
      initialValues.order !== values.order;

    if (allChecked) {
      const { sort, order, genreId, ...otherValues } = checkedValues;
      const params = {
        limit: pagination.limit,
        page: 1,
        sort,
        order,
      };
      if (checkedValues.genreId) {
        params.embed = "title_genre";
        params.genreId = genreId;
      }
      callFilterTitles(otherValues, params);
      setInitialValues({ ...values });
    }

    setSubmitting(false);
  };

  return (
    <Container className={cx("wrapper")}>
      <Row className={cx("filter-container")}>
        <Col>
          <h2>Tìm kiếm</h2>
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
                          col={{ xs: 6, md: 3, lg: 2 }}
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
                        component={Input}
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
                        col={{ md: 3 }}
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
                        col={{ md: 3 }}
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
        </Col>
      </Row>
      {titles.length > 0 ? (
        <CardList wrap data={titles} col={{ md: 2 }} totalChapter />
      ) : (
        <NoData>
          <h6>Không có truyện nào phù hợp với bộ lọc!</h6>
        </NoData>
      )}
      <Row>
        <Pagination pagination={pagination} setPagination={setPagination} />
      </Row>
    </Container>
  );
}

export default Search;
