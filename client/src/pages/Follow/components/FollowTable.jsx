import classNames from "classnames/bind";
import moment from "moment";
import PropTypes from "prop-types";

import { Table } from "components";
import styles from "../styles/FollowTable.module.scss";

const cx = classNames.bind(styles);

const getHeaders = () => [
  {
    field: "title_id",
    headerName: "Tiêu đề",
    headerAlign: "center",
    flex: 2,
    valueGetter: ({ row }) => row.title_id._id,
    renderCell: ({ row }) => {
      return (
        <div className={cx("follow__container__content__title-info")}>
          <div className={cx("box-img")}>
            <img
              src={row.title_id.cover.source}
              alt={row.title_id.title}
              className={cx("cover-image")}
            />
          </div>
          <div>
            <p className={cx("title")}>{row.title_id.title}</p>
            <p className={cx("author")}>{row.title_id.author}</p>
          </div>
        </div>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Thời gian thêm",
    maxWidth: 300,
    minWidth: 140,
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: ({ value }) => <span>{moment(value).format("DD.MM.YYYY")}</span>,
  },
];

function FollowTable({ follows, onDelete }) {
  const initialState = {
    sorting: {
      sortModel: [{ field: "createdAt", sort: "desc" }],
    },
  };

  return (
    <Table
      headers={getHeaders()}
      data={follows}
      hasToolbar
      height={700}
      rowHeight={100}
      allowDelete
      onDelete={onDelete}
      initialState={initialState}
    />
  );
}

FollowTable.propTypes = {
  follows: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      title_id: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        cover: PropTypes.shape({
          source: PropTypes.string.isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
      }),
    }).isRequired
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default FollowTable;
