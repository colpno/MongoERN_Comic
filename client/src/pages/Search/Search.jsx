import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { CardList } from "components";
import FormWrapper from "components/FormWrapper/FormWrapper";
import { NoData, Pagination } from "features";
import { usePagination } from "hooks";
import { getAllGenres } from "services/genre";
import { getAllTitles } from "services/title";
import { isEmpty } from "utils";
import SearchForm from "./components/SearchForm";
import styles from "./styles/Search.module.scss";

const cx = classNames.bind(styles);

function Search() {
  const TITLES_PER_PAGE = 35;
  const [genres, setGenres] = useState([]);
  const [titles, setTitles] = useState([]);
  const { pagination, setPagination, setPaginationTotal } =
    usePagination(TITLES_PER_PAGE);
  const [initialValues, setInitialValues] = useState({
    genreId: [],
    author: "",
    sort: "updatedAt",
    order: "desc",
  });
  const [titleParams, setTitleParams] = useState({
    sort: initialValues.sort,
    order: initialValues.order,
    page: pagination.page,
    limit: pagination.limit,
  });

  const fetchData = (params = {}) => {
    const genrePromise = getAllGenres();
    const titlePromise = getAllTitles(params);

    Promise.all([titlePromise, genrePromise])
      .then(([titleResponse, genreResponse]) => {
        setGenres(genreResponse);
        setTitles(titleResponse.data);
        setPaginationTotal(titleResponse.pagination.total);
      })
      .catch((error) => console.log(error));
  };

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

  const checkChange = (values) => {
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

    return { checkedValues, isValid: allChecked };
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const { checkedValues, isValid } = checkChange(values);

    if (isValid) {
      const { sort, order, genreId, author, ...otherValues } = checkedValues;
      const params = {
        ...otherValues,
        author_like: author,
        limit: pagination.limit,
        page: 1,
        sort,
        order,
      };

      if (checkedValues.genreId) {
        params.embed = "title_genre";
        params.genreId = genreId;
      }

      fetchData(params);
      setTitleParams(params);
      setInitialValues({ ...values });
    }

    setSubmitting(false);
  };

  useEffect(() => {
    fetchData(titleParams);
  }, [pagination.page]);

  return (
    <Container className={cx("wrapper")}>
      <Row className={cx("filter-container")}>
        <Col>
          <FormWrapper title="Tìm kiếm" fullWidth>
            <SearchForm
              initialValues={initialValues}
              handleSubmit={handleSubmit}
              cx={cx}
              genreOptions={genreOptions}
              sortOptions={sortOptions}
              orderOption={orderOption}
            />
          </FormWrapper>
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
