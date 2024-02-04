import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";
import { Container, Row } from "react-bootstrap";

import { FloatingContainer, Select } from "components";
import { useGetObjectStatuses, useGetTitles, useLazyGetChapters } from "hooks/index";
import ChapterTable from "./components/ChapterTable";
import styles from "./styles/Chapters.module.scss";

const cx = classNames.bind(styles);

function Chapters() {
  const [selectedTitleId, setSelectedTitleId] = useState({ value: "all", label: "Tất cả" });
  const { get: getChapters, data: chapters } = useLazyGetChapters();
  const { data: titles } = useGetTitles({
    _fields: "title",
  });
  const { data: objectStatuses } = useGetObjectStatuses({
    _fields: "code status color",
  });
  const [chapterQueryParams, setChapterQueryParams] = useState({
    _embed: JSON.stringify([{ collection: "status_id", field: "-_id status" }]),
  });
  const titleSelectOptions = useMemo(() => {
    return [
      { value: "all", label: "Tất cả" },
      ...titles.map((title) => {
        return { value: title._id, label: title.title };
      }),
    ];
  }, [titles]);

  const handleChangeTitle = (selectedValue) => {
    const { value: titleId } = selectedValue;

    setChapterQueryParams((prev) => {
      const params = { ...prev };
      if (titleId !== "all") {
        params.title_id = titleId;
      }
      return params;
    });
  };

  useEffect(() => {
    getChapters(chapterQueryParams);
  }, [chapterQueryParams]);

  return (
    <Container>
      <Row className={cx("label-wrapper")}>
        <h4 className={cx("label")}>All Chapters of</h4>
        <Select
          options={titleSelectOptions}
          defaultValue={titleSelectOptions[0]}
          searchable
          clearable={false}
          value={selectedTitleId}
          setValue={setSelectedTitleId}
          onChange={handleChangeTitle}
        />
      </Row>
      <FloatingContainer className={cx("data-rows")}>
        <ChapterTable chapters={chapters} objectStatuses={objectStatuses} />
      </FloatingContainer>
    </Container>
  );
}

export default Chapters;
