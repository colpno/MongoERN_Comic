import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import classNames from "classnames/bind";
import moment from "moment";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { IoTrashSharp } from "react-icons/io5";

import { Table } from "components";
import styles from "../styles/FollowTable.module.scss";

const cx = classNames.bind(styles);

const getHeaders = (handleDelete) => [
  {
    headerName: "Tiêu đề",
    field: "title_id",
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
    headerName: "Cập nhật lần cuối",
    field: "updatedAt",
    maxWidth: 300,
    minWidth: 140,
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: ({ value }) => <span>{moment(value).format("DD.MM.YYYY")}</span>,
  },
  {
    field: "actions",
    type: "actions",
    width: 60,
    getActions: ({ row }) => [
      <GridActionsCellItem
        icon={<IoTrashSharp />}
        onClick={() => handleDelete(row._id)}
        label="Delete"
      />,
    ],
  },
];

function FollowTable({ follows, onDelete }) {
  const headers = useMemo(() => getHeaders(onDelete), []);

  return <Table headers={headers} data={follows} hasToolbar autoHeight rowHeight={100} />;
}

FollowTable.propTypes = {
  follows: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
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
