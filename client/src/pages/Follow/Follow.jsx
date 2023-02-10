import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import { noFavorite } from "assets/images";
import { NoData, Popup } from "features";
import { useDelete, useToast } from "hooks";
import { followService } from "services";
import FollowTable from "./components/FollowTable";
import styles from "./styles/Follow.module.scss";

const cx = classNames.bind(styles);

function Follow() {
  const user = useSelector((state) => state.user.user);
  const [follows, setFollows] = useState([]);
  const { Toast, options, toastEmitter } = useToast();
  const hasData = follows.length > 0;

  const fetchData = () => {
    const params = {
      user_id: user._id,
      _embed: JSON.stringify([{ collection: "title_id", fields: "title cover.source author" }]),
      _fields: "-user_id -__v",
    };
    followService
      .getAll(params)
      .then((response) => setFollows(response.data))
      .catch((error) => toastEmitter(error, "error"));
  };

  const { deletedItem, setDeletedItem, popup, setPopup } = useDelete(async () => {
    followService.delete(deletedItem).then(() => {
      toastEmitter("Hủy theo dõi thành công", "success");
      fetchData();
    });
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Container className={cx("follow")}>
        {hasData ? (
          <FollowTable
            follows={follows}
            popup={popup}
            setPopup={setPopup}
            setDeletedItem={setDeletedItem}
          />
        ) : (
          <NoData image={noFavorite}>
            <>
              <h5>Hiện tại chưa có truyện nào được bạn theo dõi!</h5>
              <small>Vui lòng quay lại sau nhé!</small>
            </>
          </NoData>
        )}
      </Container>
      <Popup yesno popup={popup} setPopup={setPopup} />
      <Toast {...options} />
    </>
  );
}

export default Follow;
