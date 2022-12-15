import approvedStatusApi from "api/approvedStatusApi";

const getAllApprovedStatuses = async (params = {}) => {
  try {
    const response = await approvedStatusApi.getAll(params);
    return response;
  } catch (error) {
    return error?.data?.error || error?.data?.message;
  }
};

export default getAllApprovedStatuses;
