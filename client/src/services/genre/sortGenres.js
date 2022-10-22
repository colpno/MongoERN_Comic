import genreApi from "api/genreApi";
import { useEffect, useState } from "react";

const sortGenres = (titleID, col, isAsc = true, limit = 50) => {
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState({ isAsc, col });
  const [ID, setID] = useState(titleID);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
  });

  const setTitleID = (id) => {
    setID(id);
  };

  const sorting = (column) => {
    setSort({ isAsc: !sort.isAsc, col: column });
  };

  const sortOrder = () => (sort.isAsc ? "asc" : "desc");

  const normalSort = async () => {
    try {
      const response = await genreApi.sort(ID, sort.col, sortOrder(), {
        _limit: pagination.limit,
        _page: pagination.page,
      });
      setGenres(response.data);
      setPagination({ ...pagination, total: response.pagination.total });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    normalSort();
  }, [pagination.page, sort.isAsc, sort.col, ID]);

  return {
    genres,
    setGenres,
    pagination,
    setPagination,
    sorting,
    setTitleID,
  };
};

export default sortGenres;
