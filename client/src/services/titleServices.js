import titleApi from "api/titleApi";
import { useEffect, useState } from "react";

export const getTitles = (limit, ...dependencies) => {
  const [titles, setTitles] = useState([]);
  const TITLES_PER_PAGE = 50;
  const [pagination, setPagination] = useState({
    page: 1,
    limit: limit || TITLES_PER_PAGE,
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

export const sortTitles = (key, asc = "asc", ...dependencies) => {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await titleApi.sort(key, asc, {
          _limit: 50,
          _page: 1,
        });
        setTitles(response.data);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchTitles();
  }, [...dependencies]);

  return { titles, setTitles };
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
