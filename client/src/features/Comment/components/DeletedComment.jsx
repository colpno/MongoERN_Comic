import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";

import styles from "../styles/CommentItem.module.scss";

const cx = classNames.bind(styles);

function DeletedComment({ comment }) {
  return (
    <div className={`${cx("comment", "deleted")} disabled`}>
      <div className={cx("avatar-container")}>
        <img src={comment.author.avatar} alt="avatar" className={cx("avatar")} />
      </div>
      <div className={cx("content")}>
        <div className={cx("username")}>{comment.author.username}</div>
        <p className={cx("text")}>Bình luận đã bị xóa bởi {comment.deletedBy.username}</p>
      </div>
    </div>
  );
}

DeletedComment.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    text: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.node.isRequired]).isRequired,
    slug: PropTypes.string.isRequired,
    comment_replies_num: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    deletedBy: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default memo(DeletedComment);
