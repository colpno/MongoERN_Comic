import { FloatingContainer } from "components/index";
import { useGetUsers } from "hooks/index";
import { useMemo, useState } from "react";
import getYearOptions from "utils/getYearOptions";
import PersonalIncomeStatChart from "./PersonalIncomeStatChart";
import PersonalIncomeStatSelector from "./PersonalIncomeStatSelector";

function PersonalIncomeStat() {
  const yearOptions = getYearOptions();
  const [selectedYear, setSelectedYear] = useState(yearOptions[0]);
  const [selectedUser, setSelectedUser] = useState();
  const { data: users } = useGetUsers({ _sort: { income: -1 } });
  const userOptions = useMemo(() => {
    return users.map((user) => ({
      value: user._id,
      label: user.username,
    }));
  }, [users]);

  return (
    <>
      <PersonalIncomeStatSelector
        yearOptions={yearOptions}
        selectedYear={selectedYear}
        onChangeYear={setSelectedYear}
        selectedUser={selectedUser}
        onChangeUser={setSelectedUser}
        userOptions={userOptions}
      />
      <FloatingContainer>
        <PersonalIncomeStatChart
          selectedYear={selectedYear}
          selectedUser={selectedUser ?? userOptions[0]}
        />
      </FloatingContainer>
    </>
  );
}

export default PersonalIncomeStat;
