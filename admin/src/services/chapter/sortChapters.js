import chapterApi from "api/chapterApi";
import { useEffect, useState } from "react";
import { convertChaptersPropertyToString } from "utils/convertArrayPropertyToString";

const sortChapters = (titleID, col, isAsc = true, limit = 50) => {
  const [chapters, setChapters] = useState([]);
  const [sortInfo, setSortInfo] = useState({ isAsc, col });
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
    setSortInfo({ isAsc: !sortInfo.isAsc, col: column });
  };

  const sortOrder = () => (sortInfo.isAsc ? "asc" : "desc");

  const sort = async () => {
    try {
      const response = await chapterApi.sort(ID, sortInfo.col, sortOrder(), {
        limit: pagination.limit,
        page: pagination.page,
      });
      const converted = convertChaptersPropertyToString(response.data);
      setChapters(converted);
      setPagination({ ...pagination, total: response.pagination.total });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (ID) {
      sort();
    }
  }, [pagination.page, sortInfo.isAsc, sortInfo.col, ID]);

  return {
    chapters,
    setChapters,
    pagination,
    setPagination,
    sorting,
    setTitleID,
    refetch: sort,
  };
};

export default sortChapters;
