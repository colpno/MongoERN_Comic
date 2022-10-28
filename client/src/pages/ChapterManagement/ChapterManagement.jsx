import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { FloatingContainer, Select } from "components";
import { sortChapters } from "services/chapter";
import { getAllTitles } from "services/title";
import ChapterManagementCards from "./components/ChapterManagementCards";
import ChapterTable from "./components/ChapterTable";
import styles from "./styles/ChapterManagement.module.scss";

const cx = classNames.bind(styles);

function ChapterManagement() {
  const selectedOption = useSelector(
    (state) => state.selectField.selectedOption
  );
  const { chapters, pagination, setPagination, sorting, setTitleID } =
    sortChapters(selectedOption.value);
  const { titles } = getAllTitles();
  const [popup, setPopup] = useState({
    trigger: false,
    isConfirm: false,
    title: "",
    content: "",
  });

  const options = titles.map((title) => {
    const { id, titleName } = title;
    return { value: id.toString(), label: titleName };
  });

  useEffect(() => {
    setTitleID(selectedOption.value);
  }, [selectedOption.value]);

  return (
    <Container>
      <Row>
        <ChapterManagementCards totalTitles={pagination.total} />
      </Row>
      <Row className={cx("label-wrapper")}>
        <h4 className={cx("label")}>All Chapters of</h4>
        {titles.length > 0 && (
          <Select
            options={options}
            defaultValue={options[0]}
            searchable
            clearable
          />
        )}
      </Row>
      <FloatingContainer>
        <ChapterTable
          chapters={chapters}
          popup={popup}
          setPopup={setPopup}
          pagination={pagination}
          setPagination={setPagination}
          sorting={sorting}
        />
      </FloatingContainer>
    </Container>
  );
}

export default ChapterManagement;
