import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { FloatingContainer, FloatingForm, Select } from "components";
import { Popup, ProgressCircle } from "features";
import { useDelete, useToast, useUpdate } from "hooks";
import { setSearchText } from "libs/redux/slices/globalSlice";
import { getAllApprovedStatuses } from "services/approvedStatus";
import {
  deleteChapter,
  filterChapters,
  getAllChapters,
  getLimitedChapters,
  sortChapters,
  updateChapter,
} from "services/chapter";
import { sortTitles } from "services/title";
import ChapterManagementCards from "./components/ChapterManagementCards";
import ChapterTable from "./components/ChapterTable";
import UpdateForm from "./components/UpdateForm";
import styles from "./styles/ChapterManagement.module.scss";

const cx = classNames.bind(styles);

function ChapterManagement() {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.global.searchText);
  const selectedOption = useSelector(
    (state) => state.selectField.selectedOption
  );
  const [progress, setProgress] = useState(0);
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const { titles } = sortTitles("name", true);
  const { approvedStatuses } = getAllApprovedStatuses();
  const approvedOptions = approvedStatuses.map((status) => {
    return {
      value: status.guid,
      label: status.name,
    };
  });

  const options = [
    { value: "0", label: "Tất cả" },
    ...titles.map((title) => {
      const { guid, name } = title;
      return { value: guid, label: name };
    }),
  ];

  const {
    chapters,
    setChapters,
    pagination: chaptersPagination,
    setPagination: setChaptersPagination,
    sorting,
    setTitleID,
    refetch,
  } = sortChapters(selectedOption.value, "id", true, 30);
  const {
    chapters: limitedChapters,
    pagination: limitedChapterPagination,
    setPagination: setLimitedChapterPagination,
  } = getLimitedChapters(chaptersPagination.limit);
  const {
    chapters: filteredChapters,
    pagination: filteredChaptersPagination,
    setPagination: setFilteredChaptersPagination,
    fetch: fetchFilterChapters,
  } = filterChapters(null, chaptersPagination.limit);
  const { chapters: allChapters } = getAllChapters();
  const [popup, setPopup] = useState({
    trigger: false,
    isConfirm: false,
    title: "",
    content: "",
  });

  useEffect(() => {
    if (selectedOption.value !== "0") setTitleID(selectedOption.value);
    dispatch(setSearchText(""));
  }, [selectedOption.value]);

  useEffect(() => {
    if (searchText.length > 0) {
      const property = {
        name: searchText,
      };
      if (selectedOption.value !== "0") property.titleId = selectedOption.value;
      fetchFilterChapters(property);
    }
    if (searchText.length === 0) refetch();
  }, [searchText]);

  useEffect(() => {
    setChapters(filteredChapters);
  }, [filteredChapters]);

  const {
    deletedItem,
    setDeletedItem,
    popup: deletePopup,
    setPopup: setDeletePopup,
  } = useDelete(async () => {
    const { guid, titleId: titleID } = deletedItem;
    const value = { titleId: titleID };
    deleteChapter(guid, value, setProgress)
      .then((response) => {
        if (response.affectedRows > 0) {
          toastEmitter("Truyện đã được xóa thành công", "success");
          refetch();
          setProgress(0);
        }
      })
      .catch((error) => {
        toastEmitter(error.data.error || error.data.message, "error");
        setProgress(0);
      });
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
    updateChapter(
      updateInfo.updated.guid,
      { newValues: updateInfo.updated },
      setProgress
    )
      .then((response) => {
        if (response.affectedRows > 0) {
          toastEmitter("Truyện đã được thay đổi thành công", "success");
          refetch();
          setProgress(0);
        }
      })
      .catch((error) => {
        toastEmitter(error.data.error || error.data.message, "error");
        setProgress(0);
      });
  });

  const approvedTitles =
    approvedOptions.length > 0 &&
    allChapters.length > 0 &&
    allChapters.reduce(
      (obj, chapter) => {
        switch (chapter.approvedStatusId) {
          case approvedOptions[0].value:
            return {
              ...obj,
              waiting: obj.waiting + 1,
            };
          case approvedOptions[1].value:
            return {
              ...obj,
              accepted: obj.accepted + 1,
            };
          case approvedOptions[2].value:
            return {
              ...obj,
              rejected: obj.rejected + 1,
            };
          default:
            return { ...obj };
        }
      },
      {
        waiting: 0,
        accepted: 0,
        rejected: 0,
      }
    );

  return (
    <>
      <Container>
        <Row>
          {limitedChapters.length > 0 && (
            <ChapterManagementCards
              totalChapters={limitedChapterPagination.total}
              waiting={approvedTitles.waiting}
              accepted={approvedTitles.accepted}
              rejected={approvedTitles.rejected}
            />
          )}
        </Row>
        <Row className={cx("label-wrapper")}>
          <h4 className={cx("label")}>All Chapters of</h4>
          {titles.length > 0 && (
            <Select
              options={options}
              defaultValue={options[0]}
              searchable
              clearable={false}
            />
          )}
        </Row>
        <FloatingContainer className={cx("data-rows")}>
          {searchText.length > 0 && (
            <ChapterTable
              chapters={filteredChapters}
              popup={popup}
              pagination={filteredChaptersPagination}
              setPopup={setPopup}
              setDeleteItem={setDeletedItem}
              setPagination={setFilteredChaptersPagination}
              sorting={sorting}
              setUpdate={setUpdateInfo}
              setShowForm={setShowForm}
            />
          )}
          {searchText.length === 0 && selectedOption.value === "0" && (
            <ChapterTable
              chapters={limitedChapters}
              popup={popup}
              pagination={limitedChapterPagination}
              setPopup={setPopup}
              setDeleteItem={setDeletedItem}
              setPagination={setLimitedChapterPagination}
              sorting={sorting}
              setUpdate={setUpdateInfo}
              setShowForm={setShowForm}
            />
          )}
          {searchText.length === 0 && selectedOption.value !== "0" && (
            <ChapterTable
              chapters={chapters}
              popup={popup}
              pagination={chaptersPagination}
              setPopup={setPopup}
              setDeleteItem={setDeletedItem}
              setPagination={setChaptersPagination}
              sorting={sorting}
              setUpdate={setUpdateInfo}
              setShowForm={setShowForm}
            />
          )}
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
      <Toast {...toastOptions} />
      <ProgressCircle percentage={progress} />
    </>
  );
}

export default ChapterManagement;
