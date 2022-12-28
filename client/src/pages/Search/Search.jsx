import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { CardList, FormWrapper } from "components";
import { NoData, Pagination } from "features";
import { usePagination } from "hooks";
import { genreService, titleService } from "services";
import { isEmpty } from "utils";
import SearchForm from "./components/SearchForm";
import styles from "./styles/Search.module.scss";

const cx = classNames.bind(styles);

function Search() {
  const TITLES_PER_PAGE = 35;
  const [genreArray, setGenreArray] = useState([]);
  const [titles, setTitles] = useState([]);
  const { pagination, setPagination, setPaginationTotal } =
    usePagination(TITLES_PER_PAGE);
  const [initialValues, setInitialValues] = useState({
    genres: [],
    author: "",
    sort: "updatedAt",
    _order: "desc",
  });
  const [titleParams, setTitleParams] = useState({
    _sort: initialValues.sort,
    _order: initialValues.order,
    _page: pagination.page,
    _limit: pagination.limit,
  });

  const fetchData = (params = {}) => {
    const genrePromise = genreService.getAll();
    const titlePromise = titleService.getAll(params);

    Promise.all([titlePromise, genrePromise])
      .then(([titleResponse, genreResponse]) => {
        setGenreArray(genreResponse);
        setTitles(titleResponse.data);
        setPaginationTotal(titleResponse.paginate.total);
      })
      .catch((error) => console.error(error));
  };

  const genreOptions = genreArray.map((genre) => ({
    value: genre._id,
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
      const { sort, order, genres, author, ...otherValues } = checkedValues;
      const params = {
        ...otherValues,
        author_like: author,
        _limit: pagination.limit,
        _page: 1,
        sort,
        order,
      };

      if (checkedValues.genres) {
        params.embed = "title_genre";
        params.genres = genres;
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
