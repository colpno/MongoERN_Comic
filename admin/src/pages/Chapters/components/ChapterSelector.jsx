import classNames from "classnames/bind";
import { Select } from "components/index.jsx";
import PropTypes from "prop-types";
import { useGetTitles } from "hooks/index.jsx";
import { useMemo } from "react";
import styles from "../styles/Chapters.module.scss";

const cx = classNames.bind(styles);

function ChapterSelector({ selectedTitle, setSelectedTitle }) {
  const { data: titles } = useGetTitles({ total_chapter_gt: 0, _fields: "title" });
  const titleOptions = useMemo(() => {
    return [
      { value: "all", label: "Tất cả" },
      ...titles.map((title) => {
        return { value: title._id, label: title.title };
      }),
    ];
  }, [titles]);

  return (
    <>
      <h4 className={cx("label")}>All Chapters of</h4>
      <Select
        options={titleOptions}
        defaultValue={titleOptions[0]}
        searchable
        clearable={false}
        value={selectedTitle}
        setValue={setSelectedTitle}
      />
    </>
  );
}

ChapterSelector.propTypes = {
  selectedTitle: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedTitle: PropTypes.func.isRequired,
};

export default ChapterSelector;
