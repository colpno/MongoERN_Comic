import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";

import { Button, FloatingContainer } from "components";
import FloatingForm from "components/FloatingForm/FloatingForm";
import { Popup, ProgressCircle } from "features";
import { useAdd, useDelete, useToast, useUpdate } from "hooks";
import {
  addGenre,
  deleteGenre,
  filterGenre,
  sortGenres,
  updateGenre,
} from "services/genre";
import GenreTable from "./components/GenreTable";
import UpdateForm from "./components/UpdateForm";
import styles from "./styles/Genres.module.scss";

const cx = classNames.bind(styles);

function Genres() {
  const searchText = useSelector((state) => state.global.searchText);
  const { genres, setGenres, pagination, setPagination, sorting, sort } =
    sortGenres("id", true, 30);
  const { genres: filteredGenres, fetch: fetchFilteredGenres } = filterGenre(
    null,
    pagination.limit
  );
  const [progress, setProgress] = useState(0);
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const hasData = genres?.length > 0;

  const {
    handleSubmit: handleAddFormSubmit,
    popup: addFormPopup,
    setPopup: setAddFormPopup,
    setShowForm: setShowAddForm,
    showForm: showAddForm,
  } = useAdd(async (values) => {
    addGenre({ name: values.name }, setProgress)
      .then((response) => {
        if (response.affectedRows > 0) {
          toastEmitter("Thể loại đã được thêm thành công", "success");
          setProgress(0);
          setShowAddForm(false);
          sort();
        }
      })
      .catch((error) => {
        toastEmitter(error.data.error || error.data.message, "error");
        setProgress(0);
      });
  });

  const {
    deletedItem,
    popup: deletePopup,
    setDeletedItem,
    setPopup: setDeletePopup,
  } = useDelete(async () => {
    deleteGenre(deletedItem, setProgress)
      .then((value) => {
        if (value.affectedRows > 0) {
          toastEmitter("Thể loại đã được xóa thành công", "success");
          setProgress(0);
          sort();
        }
      })
      .catch((error) => {
        toastEmitter(error.data.error || error.data.message, "error");
        setProgress(0);
      });
  });

  const {
    updateInfo,
    showForm: showUpdateForm,
    popup: updatePopup,
    setUpdateInfo,
    setShowForm: setShowUpdateForm,
    setPopup: setUpdatePopup,
    handleSubmit: handleUpdateFormSubmit,
  } = useUpdate(async (values) => {
    const data = { name: values.name };
    updateGenre(values.guid, data, setProgress)
      .then((response) => {
        if (response.affectedRows > 0) {
          toastEmitter("Thể loại đã được thay đổi thành công", "success");
          setProgress(0);
          setShowUpdateForm(false);
          sort();
        }
      })
      .catch((error) => {
        toastEmitter(error.data.error || error.data.message, "error");
        setProgress(0);
      });
  });

  useEffect(() => {
    if (searchText.length > 0) {
      const data = {
        name: searchText,
      };
      fetchFilteredGenres(data);
    }
    if (searchText.length === 0) {
      sort();
    }
  }, [searchText]);

  useEffect(() => {
    filteredGenres.length > 0 ? setGenres(filteredGenres) : sort();
  }, [filteredGenres]);

  return (
    <>
      <Container>
        {hasData && (
          <>
            <Row className={cx("label-wrapper")}>
              <Col>
                <h4 className={cx("label")}>All Genres</h4>
              </Col>
              <Col md={4}>
                <Button primary onClick={() => setShowAddForm(true)}>
                  <AiOutlinePlus />
                  Thêm
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingContainer className={cx("data-rows")}>
                  <GenreTable
                    pagination={pagination}
                    genres={genres}
                    sorting={sorting}
                    setPagination={setPagination}
                    setPopup={setDeletePopup}
                    setDeleteItem={setDeletedItem}
                    setUpdate={setUpdateInfo}
                    setShowForm={setShowUpdateForm}
                  />
                </FloatingContainer>
              </Col>
            </Row>
          </>
        )}
      </Container>
      {showUpdateForm && Object.keys(updateInfo.selected).length > 0 && (
        <FloatingForm title="Chỉnh sửa">
          <UpdateForm
            cx={cx}
            genre={updateInfo.selected}
            handleSubmit={handleUpdateFormSubmit}
            setShowForm={setShowUpdateForm}
          />
        </FloatingForm>
      )}
      {showAddForm && (
        <FloatingForm title="Chỉnh sửa">
          <UpdateForm
            cx={cx}
            genre={{ name: "" }}
            handleSubmit={handleAddFormSubmit}
            setShowForm={setShowAddForm}
          />
        </FloatingForm>
      )}
      <Popup yesno popup={deletePopup} setPopup={setDeletePopup} />
      <Popup yesno popup={addFormPopup} setPopup={setAddFormPopup} />
      <Popup yesno popup={updatePopup} setPopup={setUpdatePopup} />
      <Toast {...toastOptions} />
      <ProgressCircle percentage={progress} />
    </>
  );
}

export default Genres;
