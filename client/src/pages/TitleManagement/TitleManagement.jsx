/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { FloatingContainer, FloatingForm } from "components";
import { Popup, ProgressCircle } from "features";
import { useDelete, useToast, useUpdate } from "hooks";
import {
  deleteTitle,
  fetchLimitedTitlesByProperty,
  getAllTitles,
  getLimitedTitlesByProperty,
  sortTitles,
  updateTitle,
} from "services/title";
import TitleManagementCards from "./components/TitleManagementCards";
import TitleTable from "./components/TitleTable";
import UpdateForm from "./components/UpdateForm";
import styles from "./styles/TitleManagement.module.scss";

const cx = classNames.bind(styles);

function TitleManagement() {
  const TITLES_PER_PAGE = 50;
  const searchText = useSelector((state) => state.global.searchText);
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const [progress, setProgress] = useState(0);
  const { titles, setTitles, pagination, setPagination, sorting, refetch } =
    sortTitles("id", true, TITLES_PER_PAGE);
  const { titles: allTitles } = getAllTitles();
  const { titles: limitedTitles, fetch: fetchLimitedTitles } =
    getLimitedTitlesByProperty(null, 30);
  const hasData = titles?.length > 0;

  const {
    deletedItem,
    setDeletedItem,
    popup: deletePopup,
    setPopup: setDeletePopup,
  } = useDelete(async () => {
    deleteTitle(
      deletedItem.titleId,
      {
        publicId: deletedItem.publicId,
      },
      setProgress
    )
      .then((response) => {
        if (response.errno === 1451) {
          setDeletePopup((prev) => ({
            ...prev,
            trigger: false,
            yesno: true,
          }));
          toastEmitter("Không thể xóa do vẫn tồn tại các chương", "success");
          refetch();
          setProgress(0);
        }
        if (response.affectedRows > 0) {
          toastEmitter("Truyện đã được xóa thành công", "success");
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
    updateTitle(
      updateInfo.updated.guid,
      {
        newValues: updateInfo.updated,
      },
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

  const titleStatuses = useMemo(() => {
    return allTitles.reduce(
      (obj, title) => {
        switch (title.releaseDay) {
          case "paused":
            return { ...obj, paused: obj.paused + 1 };
          case "finished":
            return { ...obj, finished: obj.finished + 1 };
          default:
            return { ...obj, continuing: obj.continuing + 1 };
        }
      },
      { continuing: 0, paused: 0, finished: 0, total: pagination.total }
    );
  }, [allTitles]);

  useEffect(() => {
    if (searchText) {
      const prop = { name: searchText };
      fetchLimitedTitles(prop);
    }
    if (searchText.length === 0) {
      refetch();
    }
  }, [searchText]);

  useEffect(() => {
    limitedTitles.length > 0 && setTitles(limitedTitles);
  }, [limitedTitles]);

  return (
    <>
      <Container>
        {allTitles.length > 0 && (
          <Row>
            <TitleManagementCards
              totalTitles={allTitles.length}
              continuing={titleStatuses.continuing}
              paused={titleStatuses.paused}
              finished={titleStatuses.finished}
            />
          </Row>
        )}
        {hasData && (
          <>
            <Row>
              <h4 className={cx("label")}>All Titles</h4>
            </Row>
            <FloatingContainer className={cx("table-wrapper")}>
              <TitleTable
                titles={titles}
                pagination={pagination}
                sorting={sorting}
                setPopup={setDeletePopup}
                setDeletedItem={setDeletedItem}
                setPagination={setPagination}
                setUpdate={setUpdateInfo}
                setShowForm={setShowForm}
              />
            </FloatingContainer>
          </>
        )}
      </Container>
      {showForm && Object.keys(updateInfo.selected).length > 0 && (
        <FloatingForm
          title="Chỉnh sửa"
          isShowed={showForm}
          setIsShowed={setShowForm}
        >
          <UpdateForm
            cx={cx}
            title={updateInfo.selected}
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

export default TitleManagement;
