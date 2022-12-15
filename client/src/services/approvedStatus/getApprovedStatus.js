import approvedStatusApi from "api/approvedStatusApi";

const getApprovedStatus = async (approvedStatusID) => {
  try {
    const response = await approvedStatusApi.getOne(approvedStatusID);
    return response[0];
  } catch (error) {
    return error?.data?.error || error?.data?.message;
  }
};

export default getApprovedStatus;
