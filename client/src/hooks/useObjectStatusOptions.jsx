import { useMemo } from "react";
import { useGetObjectStatuses } from "./index.jsx";

function useObjectStatusOptions() {
  const { data: statuses = [] } = useGetObjectStatuses({ _fields: "status code" });

  const statusOptions = useMemo(
    () =>
      statuses.map((status) => {
        return { value: status._id, label: status.status };
      }),
    [statuses]
  );

  return statusOptions;
}

export default useObjectStatusOptions;
