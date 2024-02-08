import classNames from "classnames/bind";
import { memo } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import { useDeleteFollow, useGetFollows } from "hooks/index.jsx";
import FollowTable from "./components/FollowTable";
import styles from "./styles/Follow.module.scss";

const cx = classNames.bind(styles);

function Follow() {
  const user = useSelector((state) => state.user.user);
  const { data: follows = [] } = useGetFollows({
    user_id: user._id,
    _embed: JSON.stringify([{ collection: "title_id", fields: "title cover.source author" }]),
    _fields: "-user_id -__v",
  });
  const { del: deleteFollow } = useDeleteFollow();

  const handleDelete = (data) => {
    const ids = data instanceof Map ? Array.from(data.keys()) : data;
    const params = {
      _id_in: ids,
    };

    deleteFollow(params);
  };

  return (
    <Container className={cx("follow")}>
      <FollowTable follows={follows} onDelete={handleDelete} />
    </Container>
  );
}

export default memo(Follow);
