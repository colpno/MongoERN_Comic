import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";

import { Button, FloatingContainer, FloatingForm } from "components";
import { Popup, ProgressCircle } from "features";
import { useAdd, useDelete, useToast, useUpdate } from "hooks";
import {
  addPayMethod,
  deletePayMethod,
  filterPayMethod,
  sortPayMethods,
  updatePayMethod,
} from "services/paymentMethod";
import PaymentMethodTable from "./components/PaymentMethodTable";
import UpdateForm from "./components/UpdateForm";
import styles from "./styles/PaymentMethodManagement.module.scss";

const cx = classNames.bind(styles);

function PaymentMethodManagement() {
  const searchText = useSelector((state) => state.global.searchText);
  const {
    paymentMethods,
    setPaymentMethods,
    pagination,
    setPagination,
    sorting,
    sort,
  } = sortPayMethods("id", true, 30);
  const { payMethods: filteredPayMethods, fetch: fetchFilteredPayMethods } =
    filterPayMethod(null, pagination.limit);
  const [progress, setProgress] = useState(0);
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const hasData = paymentMethods?.length > 0;

  const {
    handleSubmit: handleAddFormSubmit,
    popup: addFormPopup,
    setPopup: setAddFormPopup,
    setShowForm: setShowAddForm,
    showForm: showAddForm,
  } = useAdd(async (values) => {
    addPayMethod(
      {
        name: values.name,
      },
      setProgress
    )
      .then((response) => {
        if (response.affectedRows > 0) {
          toastEmitter(
            "Phương thức thanh toán đã được thêm thành công",
            "success"
          );
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
    deletePayMethod(deletedItem, setProgress)
      .then((response) => {
        if (response.affectedRows > 0) {
          toastEmitter(
            "Phương thức thanh toán đã được xóa thành công",
            "success"
          );
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
  } = useUpdate(async ({ guid, ...values }) => {
    updatePayMethod(guid, values)
      .then((response) => {
        if (response.affectedRows > 0) {
          toastEmitter(
            "Phương thức thanh toán đã được thay đổi thành công",
            "success"
          );
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
      fetchFilteredPayMethods(data);
    }
    if (searchText.length === 0) {
      sort();
    }
  }, [searchText]);

  useEffect(() => {
    filteredPayMethods.length > 0
      ? setPaymentMethods(filteredPayMethods)
      : sort();
  }, [filteredPayMethods]);

  return (
    <>
      <Container>
        {hasData && (
          <>
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
      <Toast {...toastOptions} />
      <ProgressCircle percentage={progress} />
    </>
  );
}

export default PaymentMethodManagement;
