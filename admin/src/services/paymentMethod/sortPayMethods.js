import paymentMethodApi from "api/paymentMethodApi";
import { useEffect, useState } from "react";

const sortPayMethod = (col, isAsc = true, limit = 50) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [sortInfo, setSort] = useState({ isAsc, col });
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
  });

  const sorting = (column) => {
    setSort({ isAsc: !sortInfo.isAsc, col: column });
  };

  const sortOrder = () => (sortInfo.isAsc ? "asc" : "desc");

  const sort = async () => {
    try {
      const response = await paymentMethodApi.sort(sortInfo.col, sortOrder(), {
        limit: pagination.limit,
        page: pagination.page,
      });
      setPaymentMethods(response.data);
      setPagination({ ...pagination, total: response.pagination.total });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    sort();
  }, [pagination.page, sortInfo.isAsc, sortInfo.col]);

  return {
    paymentMethods,
    setPaymentMethods,
    pagination,
    setPagination,
    sorting,
    sort,
  };
};

export default sortPayMethod;
