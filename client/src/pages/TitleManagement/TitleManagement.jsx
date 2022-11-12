import classNames from "classnames/bind";
import { Container, Row } from "react-bootstrap";

import { FloatingContainer, FloatingForm } from "components";
import { Popup } from "features";
import { useDelete, useUpdate } from "hooks";
import { sortTitles } from "services/title";
import TitleManagementCards from "./components/TitleManagementCards";
import TitleTable from "./components/TitleTable";
import styles from "./styles/TitleManagement.module.scss";
import UpdateForm from "./components/UpdateForm";

const cx = classNames.bind(styles);

function TitleManagement() {
  const TITLES_PER_PAGE = 50;
  const { titles, pagination, setPagination, sorting } = sortTitles(
    "id",
    true,
    TITLES_PER_PAGE
  );
  const hasData = titles?.length > 0;

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
        {hasData && (
          <>
            <Row>
              <TitleManagementCards totalTitles={pagination.total} />
            </Row>
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
    </>
  );
}

export default TitleManagement;
