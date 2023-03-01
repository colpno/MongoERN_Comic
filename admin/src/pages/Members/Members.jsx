/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { FloatingContainer } from "components";
import { useToast } from "hooks";
import { userService } from "services";
import MemberManagementCards from "./components/MemberManagementCards";
import MemberTable from "./components/MemberTable";

function Members() {
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);
  const { Toast, options: toastOptions, toastEmitter } = useToast();

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

  const handleUpdate = (data, setRowIdError) => {
    const { _id, ...fields } = data;

    userService
      .update(_id, fields)
      .then((response) => {
        setMembers((prev) => prev.map((item) => (item._id === _id ? response.data : item)));
        toastEmitter(response.message);
      })
      .catch((error) => {
        setRowIdError(_id);
        toastEmitter(error, "error");
      });
  };

  useEffect(() => {
    const params = { role: "member" };

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
          <MemberTable members={members} onUpdate={handleUpdate} />
        </FloatingContainer>
      </Container>
      <Toast {...toastOptions} />
    </>
  );
}

export default Members;
