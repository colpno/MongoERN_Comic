import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { CardList, FormWrapper } from "components";
import { SEARCH_PAGE_TITLES_PER_PAGE } from "constants/paginate.constant";
import { NoData, Pagination } from "features";
import { useGetGenres, useLazyGetTitles, usePagination } from "hooks";
import { isEmpty } from "utils";
import SearchForm from "./components/SearchForm";
import styles from "./styles/Search.module.scss";

const cx = classNames.bind(styles);

function Search() {
  const { data: genres = [] } = useGetGenres();
  const { get: getTitles } = useLazyGetTitles();
  const [titles, setTitles] = useState([]);
  const { pagination, setPagination, setPaginationTotal } = usePagination(
    SEARCH_PAGE_TITLES_PER_PAGE
  );
  const [initialValues, setInitialValues] = useState({
    genres: [],
    author: "",
    sort: "updatedAt",
    order: "desc",
  });
  const [titleParams, setTitleParams] = useState({
    _sort: {
      [initialValues.sort]: initialValues.order,
    },
    _page: pagination.page,
    _limit: pagination.limit,
    _embed: JSON.stringify([
      { collection: "approved_status_id", fields: "-_id code", match: { code: "apd" } },
      { collection: "status_id", fields: "-_id code", match: { code: "vis" } },
    ]),
  });
  const genreOptions = useMemo(
    () =>
      genres.map((genre) => ({
        value: genre.name,
        label: genre.name,
      })),
    [genres]
  );
  const sortOptions = [
    { value: "updatedAt", label: "Ngày cập nhật" },
    { value: "title", label: "Tên truyện" },
    { value: "total_chapter", label: "Số chương" },
    { value: "like", label: "Lượt thích" },
    { value: "view", label: "Lượt xem" },
  ];
  const orderOption = [
    { value: "asc", label: "Tăng dần" },
    { value: "desc", label: "Giảm dần" },
  ];

  const fetchData = async (params = {}) => {
    const response = await getTitles({ params, isPrivate: false }).unwrap();
    setTitles(response.data);
    setPaginationTotal(response.pagination.total);
  };

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
      const { sort, order, genres: submittedGenres, author, ...otherValues } = checkedValues;
      const params = {
        ...otherValues,
        author_like: author,
        _limit: pagination.limit,
        _page: 1,
        _sort: {
          [sort]: order,
        },
      };

      if (checkedValues.genres) {
        params.genres_all = submittedGenres;
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
        <CardList wrap data={titles} col={{ md: 2 }} totalChapter dropRow={false} />
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
