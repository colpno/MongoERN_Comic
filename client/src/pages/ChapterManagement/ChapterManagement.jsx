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
  const hasData = chapters?.length > 0;
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
      {titles.length > 0 && (
        <FloatingContainer>
          <p>Select title to display all of it&apos;s chapters:</p>
          <Select options={options} defaultValue={options[0]} searchable />
        </FloatingContainer>
      )}
      {hasData && (
        <>
          <Row>
            <ChapterManagementCards totalTitles={pagination.total} />
          </Row>
          <Row>
            <h4 className={cx("label")}>All Chapters</h4>
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
        </>
      )}
    </Container>
  );
}

export default ChapterManagement;
