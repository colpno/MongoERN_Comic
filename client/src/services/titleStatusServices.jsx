import titleStatusApi from "api/titleStatusApi";
import { useEffect, useState } from "react";

function titleStatusServices() {
  const [titleStatuses, setTitleStatuses] = useState();

  useEffect(() => {
    const fetchTitleStatuses = async () => {
      try {
        const response = await titleStatusApi.getAll();
        const options = response.map((genr) => {
          return { value: `${genr.id}`, label: genr.status };
        });
        setTitleStatuses(options);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchTitleStatuses();
  }, []);

  return { titleStatuses, setTitleStatuses };
}

export default titleStatusServices;
