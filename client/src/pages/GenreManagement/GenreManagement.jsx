import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";

import { Button, FloatingContainer } from "components";
import FloatingForm from "components/FloatingForm/FloatingForm";
import { Popup } from "features";
import { useAdd, useDelete, useUpdate } from "hooks";
import { addGenre, deleteGenre, sortGenres, updateGenre } from "services/genre";
import GenreManagementCards from "./components/GenreManagementCards";
import GenreTable from "./components/GenreTable";
import UpdateForm from "./components/UpdateForm";
import styles from "./styles/GenreManagement.module.scss";

const cx = classNames.bind(styles);

function GenreManagement() {
  const { genres, pagination, setPagination, sorting, sort } = sortGenres(
    "id",
    true,
    30
  );
  const hasData = genres?.length > 0;

  const {
    handleSubmit: handleAddFormSubmit,
    popup: addFormPopup,
    setPopup: setAddFormPopup,
    setShowForm: setShowAddForm,
    showForm: showAddForm,
  } = useAdd(async (values) => {
    addGenre({
      name: values.name,
    }).then((response) => {
      if (response.affectedRows > 0) {
        sort();
      }
    });
  });

  const {
    deletedItem,
    popup: deletePopup,
    setDeletedItem,
    setPopup: setDeletePopup,
  } = useDelete(async () => {
    deleteGenre(deletedItem).then((value) => {
      if (value.affectedRows > 0) {
        sort();
      }
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
    updateGenre(values.guid, data).then((response) => {
      if (response.affectedRows > 0) {
        sort();
      }
    });
  });

  return (
    <>
      <Container>
        {hasData && (
          <>
            <Row>
              <GenreManagementCards totalTitles={pagination.total} />
            </Row>
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
                <FloatingContainer>
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
    </>
  );
}

export default GenreManagement;
