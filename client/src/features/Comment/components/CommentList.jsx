import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "../styles/CommentList.module.scss";
import CommentItem from "./CommentItem";
import DeletedComment from "./DeletedComment";

const cx = classNames.bind(styles);

function CommentList({ comments, handleSubmit, getReplies, handleDelete }) {
  return (
    <div className={cx("comments")}>
      {comments.map((comment) => {
        return (
          <div className={cx("comment-group")} key={comment._id}>
            {comment.deletedBy ? (
              <DeletedComment comment={comment} />
            ) : (
              <CommentItem
                comment={comment}
                handleReplySubmit={handleSubmit}
                getReplies={getReplies}
                canReply
                handleDelete={handleDelete}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  getReplies: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default CommentList;
