import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import { followService } from "services";
import FollowTable from "./components/FollowTable";
import styles from "./styles/Follow.module.scss";

const cx = classNames.bind(styles);

function Follow() {
  const user = useSelector((state) => state.user.user);
  const [follows, setFollows] = useState([]);

  const handleDelete = (data) => {
    const ids = data instanceof Map ? Array.from(data.keys()) : data;
    const params = {
      _id_in: ids,
    };

    followService.delete(params).then(() => {
      setFollows((prev) =>
        prev.filter((item) => (Array.isArray(ids) ? !ids.includes(item._id) : ids !== item._id))
      );
    });
  };

  useEffect(() => {
    const params = {
      user_id: user._id,
      _embed: JSON.stringify([{ collection: "title_id", fields: "title cover.source author" }]),
      _fields: "-user_id -__v",
    };
    followService.getAll(params).then((response) => setFollows(response.data));
  }, []);

  return (
    <Container className={cx("follow")}>
      <FollowTable follows={follows} onDelete={handleDelete} />
    </Container>
  );
}

export default Follow;
