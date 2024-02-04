import { useMemo } from "react";
import { Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import { useGetUsers, useUpdateUser } from "hooks";
import MemberManagementCards from "./components/MemberManagementCards";
import MemberTable from "./components/MemberTable";

function Members() {
  const { data: members } = useGetUsers({ role: "member" });
  const { update: updateUser } = useUpdateUser();

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
    updateUser(data).catch(() => {
      setRowIdError(data._id);
    });
  };

  return (
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
  );
}

export default Members;
