/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";

import { Button, FloatingContainer, FloatingForm } from "components";
import { Popup } from "features";
import { useAdd, useDelete, useUpdate } from "hooks";
import {
  addPayMethod,
  deletePayMethod,
  sortPayMethods,
  updatePayMethod,
} from "services/paymentMethod";
import PaymentMethodManagementCards from "./components/PaymentMethodManagementCards";
import PaymentMethodTable from "./components/PaymentMethodTable";
import styles from "./styles/PaymentMethodManagement.module.scss";
import UpdateForm from "./components/UpdateForm";

const cx = classNames.bind(styles);

function PaymentMethodManagement() {
  const { paymentMethods, pagination, setPagination, sorting, sort } =
    sortPayMethods("id", true, 30);
  const hasData = paymentMethods?.length > 0;

  const {
    handleSubmit: handleAddFormSubmit,
    popup: addFormPopup,
    setPopup: setAddFormPopup,
    setShowForm: setShowAddForm,
    showForm: showAddForm,
  } = useAdd(async (values) => {
    addPayMethod({
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
    deletePayMethod(deletedItem).then((response) => {
      if (response.affectedRows > 0) {
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
  } = useUpdate(async ({ guid, ...values }) => {
    updatePayMethod(guid, values).then((response) => {
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
              <PaymentMethodManagementCards totalTitles={pagination.total} />
            </Row>
            <Row className={cx("label-wrapper")}>
              <Col>
                <h4 className={cx("label")}>All Payment Methods</h4>
              </Col>
              <Col md={4}>
                <Button primary onClick={() => setShowAddForm(true)}>
                  <AiOutlinePlus />
                  Thêm
                </Button>
              </Col>
            </Row>
            <FloatingContainer>
              <PaymentMethodTable
                paymentMethods={paymentMethods}
                pagination={pagination}
                sorting={sorting}
                setPopup={setDeletePopup}
                setPagination={setPagination}
                setDeleteItem={setDeletedItem}
                setUpdate={setUpdateInfo}
                setShowForm={setShowUpdateForm}
              />
            </FloatingContainer>
          </>
        )}
      </Container>
      {showUpdateForm && Object.keys(updateInfo.selected).length > 0 && (
        <FloatingForm
          title="Chỉnh sửa"
          isShowed={showUpdateForm}
          setIsShowed={setShowUpdateForm}
        >
          <UpdateForm
            cx={cx}
            data={updateInfo.selected}
            handleSubmit={handleUpdateFormSubmit}
            setShowForm={setShowUpdateForm}
          />
        </FloatingForm>
      )}
      {showAddForm && (
        <FloatingForm title="Chỉnh sửa">
          <UpdateForm
            cx={cx}
            data={{ name: "" }}
            handleSubmit={handleAddFormSubmit}
            setShowForm={setShowAddForm}
          />
        </FloatingForm>
      )}
      <Popup yesno popup={deletePopup} setPopup={setDeletePopup} />
      <Popup yesno popup={updatePopup} setPopup={setUpdatePopup} />
      <Popup yesno popup={addFormPopup} setPopup={setAddFormPopup} />
    </>
  );
}

export default PaymentMethodManagement;
