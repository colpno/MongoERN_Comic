import followApi from "api/followApi";
import { useEffect, useState } from "react";

const sortFollows = (titleID, col, isAsc = true, limit = 50) => {
  const [follows, setFollows] = useState([]);
  const [titles, setTitles] = useState([]);
  const [sort, setSort] = useState({ isAsc, col });
  const [ID, setID] = useState(titleID);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
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
      const response = await followApi.sort(ID, sort.col, sortOrder(), {
        _limit: pagination.limit,
        _page: pagination.page,
      });
      setFollows(response.data);
      setTitles(response.data.map((follow) => follow.title));
      setPagination({ ...pagination, total: response.pagination.total });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    normalSort();
  }, [pagination.page, sort.isAsc, sort.col, ID]);

  return {
    titles,
    setTitles,
    follows,
    setFollows,
    pagination,
    setPagination,
    sorting,
    setTitleID,
  };
};

export default sortFollows;
