import purchasedChapterApi from "api/purchasedChapterApi";
import { useEffect, useState } from "react";

const sortPurchasedChapters = (titleID, col, isAsc = true, limit = 50) => {
  const [purchasedChapters, setPurchasedChapters] = useState([]);
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
      const response = await purchasedChapterApi.sort(
        ID,
        sort.col,
        sortOrder(),
        {
          limit: pagination.limit,
          page: pagination.page,
        }
      );
      setPurchasedChapters(response.data);
      setPagination({ ...pagination, total: response.pagination.total });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    normalSort();
  }, [pagination.page, sort.isAsc, sort.col, ID]);

  return {
    purchasedChapters,
    setPurchasedChapters,
    pagination,
    setPagination,
    sorting,
    setTitleID,
  };
};

export default sortPurchasedChapters;
