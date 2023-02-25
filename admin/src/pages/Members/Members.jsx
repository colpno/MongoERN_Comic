import { useEffect, useMemo, useState } from "react";
import { Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import { Popup } from "features";
import { usePopup, useToast } from "hooks";
import { userService } from "services";
import MemberManagementCards from "./components/MemberManagementCards";
import MembersTable from "./components/MembersTable";

function Members() {
  const [members, setMembers] = useState([]);
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const { popup, setPopup, triggerPopup } = usePopup({
    type: "confirm",
  });

  const stat = useMemo(() => {
    return members.reduce(
      (result, member) => {
        return {
          coin: result.coin + member.coin,
          income: result.income + member.income,
          highestCoin: result.highestCoin < member.coin ? member.coin : result.highestCoin,
          highestIncome:
            result.highestIncome < member.income ? member.income : result.highestIncome,
        };
      },
      {
        coin: 0,
        income: 0,
        highestCoin: members[0]?.coin || 0,
        highestIncome: members[0]?.income || 0,
      }
    );
  }, [members]);

  const handleUpdate = (editedInfo) => {
    const { _id, ...fields } = editedInfo[0];

    setPopup({
      title: "Cập nhật tài khoản",
      content: "Bạn có chắc chắn muốn thay đổi không?",
      isShown: true,
      onConfirm: () => {
        userService
          .update(_id, fields)
          .then((response) => {
            userService((prev) => prev.map((item) => (item._id === _id ? response.data : item)));
            toastEmitter(response.message);
          })
          .catch((error) => toastEmitter(error));
      },
    });
  };

  useEffect(() => {
    const params = {
      role: "member",
    };

    userService
      .getAll(params)
      .then((response) => setMembers(response.data))
      .catch((error) => toastEmitter(error, "error"));
  }, []);

  return (
    <>
      <Container>
        <Row>
          <MemberManagementCards
            totalCoin={stat.coin}
            totalIncome={stat.income}
            highestCoin={stat.highestCoin}
            highestIncome={stat.highestIncome}
          />
        </Row>
        <Row>
          <h4>All Members</h4>
        </Row>
        <FloatingContainer>
          <MembersTable members={members} onRowEditCommit={handleUpdate} />
        </FloatingContainer>
      </Container>
      {popup.isShown && <Popup data={popup} setShow={triggerPopup} />}
      <Toast {...toastOptions} />
    </>
  );
}

export default Members;
