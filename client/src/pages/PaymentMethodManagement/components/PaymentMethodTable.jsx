import { GridTable } from "components";
import { Pagination } from "features";
import PropTypes from "prop-types";
import PaymentMethodTableRow from "./PaymentMethodTableRow";

function PaymentMethodTable({
  paymentMethods,
  setPopup,
  pagination,
  setPagination,
  sorting,
  setDeleteItem,
  setUpdate,
  setShowForm,
}) {
  return (
    <>
      <GridTable
        head={[
          { label: "#", name: "id", sm: 1 },
          { label: "Phương thức", name: "name", sm: 4 },
          { label: "Ngày tạo", name: "createdAt" },
          { label: "Ngày sửa", name: "updatedAt" },
          { label: "", sm: 2 },
        ]}
        sorting={sorting}
      >
        <PaymentMethodTableRow
          paymentMethods={paymentMethods}
          setPopup={setPopup}
          setDeleteItem={setDeleteItem}
          setUpdate={setUpdate}
          setShowForm={setShowForm}
        />
      </GridTable>
      <Pagination pagination={pagination} setPagination={setPagination} />
    </>
  );
}

PaymentMethodTable.propTypes = {
  paymentMethods: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  setPopup: PropTypes.func.isRequired,
  pagination: PropTypes.shape({}).isRequired,
  setPagination: PropTypes.func.isRequired,
  sorting: PropTypes.func.isRequired,
  setDeleteItem: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
};

export default PaymentMethodTable;
