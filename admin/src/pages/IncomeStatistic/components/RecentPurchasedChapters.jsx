import moment from "moment";
import PropTypes from "prop-types";

import { Table } from "components";

function RecentPurchasedChapters({ cx, purchasedChapters }) {
  const initialState = {
    sorting: {
      sortModel: [{ field: "createAt", sort: "desc" }],
    },
  };

  return (
    <Table
      headers={[
        {
          field: "user_id.username",
          headerName: "Người mua",
        },
        {
          field: "createdAt",
          headerName: "Thời gian giao dịch",
          renderCell: ({ value }) => (
            <span className={cx("timestamp")}>{moment(value).format("DD/MM/YYYY hh:mm:ss")}</span>
          ),
        },
      ]}
      data={purchasedChapters}
      hasToolbar
      height={400}
      rowHeight={100}
      initialState={initialState}
    />
  );
}

RecentPurchasedChapters.propTypes = {
  cx: PropTypes.func.isRequired,
  purchasedChapters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      chapter: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
      }).isRequired,
      createdAt: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default RecentPurchasedChapters;
