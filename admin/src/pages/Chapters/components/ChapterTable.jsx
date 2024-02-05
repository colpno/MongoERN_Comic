import classNames from "classnames/bind";
import { FloatingContainer, Table } from "components";
import { useLazyGetChapters } from "hooks/index.jsx";
import PropTypes from "prop-types";
import { useEffect } from "react";
import styles from "../styles/ChaptersTable.module.scss";
import { getChapterHeaders } from "../helpers/getChapterHeaders.jsx";

const cx = classNames.bind(styles);

function ChapterTable({ selectedTitle }) {
  const { get: getChapters, data: chapters } = useLazyGetChapters();
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

  useEffect(() => {
    const { value: titleId } = selectedTitle;
    getChapters({
      title_id: titleId !== "all" ? titleId : undefined,
      _embed: JSON.stringify([{ collection: "status_id", field: "-_id status color" }]),
    });
  }, [selectedTitle]);

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
  selectedTitle: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChapterTable;
