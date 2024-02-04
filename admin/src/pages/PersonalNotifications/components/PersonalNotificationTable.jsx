import moment from "moment";
import PropTypes from "prop-types";

import { Table } from "components";
import { useGetUsers } from "hooks/index";
import { memo, useMemo } from "react";

function PersonalNotificationTable({ notifications, onDelete, onUpdate, onAdd }) {
  const initialState = {
    sorting: {
      sortModel: [{ field: "updatedAt", sort: "desc" }],
    },
    pinnedColumns: { right: ["actions"] },
  };

  const initialNewRowData = {
    user_id: "",
    text: "",
  };

  const userQueryParams = { role: "member", _fields: "username" };
  const { data: members } = useGetUsers(userQueryParams);
  const memberUsernames = useMemo(() => members.map((member) => member.username), [members]);

  return (
    <>
      {members && (
        <Table
          headers={[
            {
              field: "user_id",
              headerName: "Người nhận",
              type: "singleSelect",
              valueOptions: memberUsernames,
              width: 140,
              headerAlign: "center",
              align: "center",
              editable: true,
              flex: 1,
              valueGetter: ({ value }) => value.username,
              valueSetter: (params) => {
                const value = members.find((member) => member.username === params.value)?._id || "";
                return { ...params.row, user_id: value };
              },
            },
            {
              field: "text",
              headerName: "Nội dung",
              align: "left",
              headerAlign: "center",
              flex: 2,
              minWidth: 200,
              editable: true,
              renderCell: ({ value }) => <span title={value}>{value}</span>,
            },
            {
              field: "read_at",
              headerName: "Thời gian đọc",
              flex: 1,
              minWidth: 140,
              maxWidth: 200,
              align: "center",
              headerAlign: "center",
              renderCell: ({ value }) => (
                <span className="timestamp">
                  {value ? moment(value).format("DD.MM.YYYY HH:mm") : ""}
                </span>
              ),
            },
            {
              field: "createdAt",
              headerName: "Ngày tạo",
              flex: 1,
              minWidth: 140,
              maxWidth: 200,
              align: "center",
              headerAlign: "center",
              renderCell: ({ value }) => (
                <span className="timestamp">{moment(value).format("DD.MM.YYYY HH:mm")}</span>
              ),
            },
            {
              headerName: "Ngày sửa",
              field: "updatedAt",
              align: "center",
              flex: 1,
              maxWidth: 200,
              minWidth: 140,
              headerAlign: "center",
              renderCell: ({ value }) => (
                <span className="timestamp">{moment(value).format("DD.MM.YYYY HH:mm")}</span>
              ),
            },
          ]}
          data={notifications}
          hasToolbar
          height={700}
          rowHeight={100}
          initialState={initialState}
          allowDelete
          onDelete={onDelete}
          allowEdit
          onUpdate={onUpdate}
          allowAdd
          onAdd={onAdd}
          initialNewRowData={initialNewRowData}
        />
      )}
      <div />
    </>
  );
}

PersonalNotificationTable.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default memo(PersonalNotificationTable);
