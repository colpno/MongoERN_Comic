import classNames from "classnames/bind";
import { FloatingContainer, Table } from "components";
import PropTypes from "prop-types";
import { getChapterHeaders } from "../helpers/getChapterHeaders.jsx";
import styles from "../styles/ChaptersTable.module.scss";

const cx = classNames.bind(styles);

function ChapterTable({ chapters }) {
  const initialState = {
    sorting: {
      sortModel: [
        { field: "updatedAt", sort: "desc" },
        { field: "order", sort: "desc" },
      ],
    },
    pinnedColumns: {
      left: ["title"],
      right: ["actions"],
    },
  };

  return (
    <FloatingContainer className={cx("data-rows")}>
      <Table
        headers={getChapterHeaders()}
        data={chapters}
        hasToolbar
        height={700}
        rowHeight={100}
        initialState={initialState}
      />
    </FloatingContainer>
  );
}

ChapterTable.propTypes = {
  chapters: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default ChapterTable;
