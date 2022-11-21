export const convertApproveStatus = (status) => {
  switch (status) {
    case "accepted":
      return "Đã duyệt";
    case "waiting":
      return "Chờ duyệt";
    case "rejected":
      return "Từ chối";
    default:
      return "Bản nháp";
  }
};
