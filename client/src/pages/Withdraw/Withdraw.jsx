import { useState } from "react";
import { Container, Row } from "react-bootstrap";

import { SelectTable } from "components";
import PayPalForm from "./components/PayPalForm";

function Withdraw() {
  const [choseMethod, setChoseMethod] = useState({
    value: "",
    label: "",
  });

  const options = [
    {
      value: "vnpay",
      label: "VNPay",
    },
    {
      value: "paypal",
      label: "PayPal",
    },
  ];

  return (
    <Container>
      <Row>
        <SelectTable
          title="Chọn phương thức rút tiền"
          options={options}
          chosen={choseMethod}
          setChosen={setChoseMethod}
        />
      </Row>
      <Row>{choseMethod.value === "paypal" && <PayPalForm />}</Row>
    </Container>
  );
}

export default Withdraw;
