import { noNotification } from "assets/images";
import NoData from "features/NoData";

function MyNotice() {
  return (
    <NoData image={noNotification}>
      <h5>Hiện tại chưa có thông báo nào dành cho bạn!</h5>
      <small>Vui lòng quay lại sau nhé!</small>
    </NoData>
  );
}

export default MyNotice;
