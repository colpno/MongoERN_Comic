/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { Button, FloatingContainer, FloatingForm, Select } from "components";
import { Popup } from "features";
import { useDelete, useUpdate } from "hooks";
import { getAllApprovedStatuses } from "services/approvedStatus";
import { sortChapters } from "services/chapter";
import { getAllTitles } from "services/title";
import ChapterManagementCards from "./components/ChapterManagementCards";
import ChapterTable from "./components/ChapterTable";
import UpdateForm from "./components/UpdateForm";
import styles from "./styles/ChapterManagement.module.scss";

const cx = classNames.bind(styles);

function ChapterManagement() {
  const selectedOption = useSelector(
    (state) => state.selectField.selectedOption
  );
  const { chapters, pagination, setPagination, sorting, setTitleID } =
    sortChapters(selectedOption.value, "id");
  const { titles } = getAllTitles();
  const [popup, setPopup] = useState({
    trigger: false,
    isConfirm: false,
    title: "",
    content: "",
  });

  const options = titles.map((title) => {
    const { guid, name } = title;
    return { value: guid, label: name };
  });

  useEffect(() => {
    setTitleID(selectedOption.value);
  }, [selectedOption.value]);

  const {
    deletedItem,
    popup: deletePopup,
    setDeletedItem,
    setPopup: setDeletePopup,
  } = useDelete(async () => {
    console.log(deletedItem);
  });

  const {
    updateInfo,
    showForm,
    popup: updatePopup,
    setUpdateInfo,
    setShowForm,
    setPopup: setUpdatePopup,
    handleSubmit: handleUpdateFormSubmit,
  } = useUpdate(async () => {
    console.log(updateInfo.updated);
  });

  return (
    <>
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
            pagination={pagination}
            setPopup={setPopup}
            setDeleteItem={setDeletedItem}
            setPagination={setPagination}
            sorting={sorting}
            setUpdate={setUpdateInfo}
            setShowForm={setShowForm}
          />
        </FloatingContainer>
      </Container>
      {showForm && Object.keys(updateInfo.selected).length > 0 && (
        <FloatingForm
          title="Chỉnh sửa"
          isShowed={showForm}
          setIsShowed={setShowForm}
        >
          <UpdateForm
            cx={cx}
            chapter={updateInfo.selected}
            popup={updatePopup}
            handleSubmit={handleUpdateFormSubmit}
            setShowForm={setShowForm}
            setPopup={setUpdatePopup}
          />
        </FloatingForm>
      )}
      <Popup yesno popup={deletePopup} setPopup={setDeletePopup} />
      <Popup yesno popup={updatePopup} setPopup={setUpdatePopup} />
    </>
  );
}

export default ChapterManagement;
