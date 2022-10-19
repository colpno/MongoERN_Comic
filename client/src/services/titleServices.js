import titleApi from "api/titleApi";
import { useEffect, useState } from "react";

export const getTitles = (limit, ...dependencies) => {
  const [titles, setTitles] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        if (limit) {
          const response = await titleApi.getAll({
            _page: pagination.page,
            _limit: pagination.limit,
          });
          setTitles(response.data);
          setPagination((prev) => {
            return { ...prev, total: response.pagination.total };
          });
        } else {
          const response = await titleApi.getAll();
          setTitles(response);
          setPagination((prev) => {
            return { ...prev, total: response.length };
          });
        }
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchTitles();
  }, [pagination.page, ...dependencies]);

  return { titles, setTitles, pagination, setPagination };
};

export const getTitlesByUerID = (ID, limit, ...dependencies) => {
  const [titles, setTitles] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        if (limit) {
          const response = await titleApi.getAllByUserID(ID, {
            _page: pagination.page,
            _limit: pagination.limit,
          });
          setTitles(response.data);
          setPagination((prev) => {
            return { ...prev, total: response.pagination.total };
          });
        } else {
          const response = await titleApi.getAllByUserID(ID);
          setTitles(response);
          setPagination((prev) => {
            return { ...prev, total: response.length };
          });
        }
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchTitles();
  }, [pagination.page, ...dependencies]);

  return { titles, setTitles, pagination, setPagination };
};

export const getTitleByID = (ID, ...dependencies) => {
  const [title, setTitle] = useState({});

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await titleApi.getOneById(ID);
        setTitle(response);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchTitles();
  }, [...dependencies]);

  return { title, setTitle };
};

export const sortTitles = (col, isAsc, limit = 50, userID = null) => {
  const [titles, setTitles] = useState([]);
  const [sort, setSort] = useState({ isAsc, col });
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
  });

  const sorting = (column) => {
    setSort({ isAsc: !sort.isAsc, col: column });
  };

  const sortOrder = () => (sort.isAsc ? "asc" : "desc");

  const fetchTitles = async () => {
    try {
      const response = userID
        ? // get titles by userID with sorted data
          await titleApi.sortByUserID(userID, sort.col, sortOrder(), {
            _page: pagination.page,
            _limit: pagination.limit,
          })
        : // get titles with sorted data
          await titleApi.sort(sort.col, sortOrder(), {
            _page: pagination.page,
            _limit: pagination.limit,
          });
      setTitles(response.data);
      setPagination({ ...pagination, total: response.pagination.total });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchTitles();
  }, [pagination.page, sort.isAsc, sort.col]);

  return {
    titles,
    setTitles,
    pagination,
    setPagination,
    sorting,
  };
};

export const searchTitle = (key, value, ...dependencies) => {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await titleApi.search({ [key]: value });
        setTitles(response);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchTitles();
  }, [...dependencies]);

  return { titles, setTitles };
};
