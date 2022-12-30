import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "../styles/CommentList.module.scss";
import CommentItem from "./CommentItem";

const cx = classNames.bind(styles);

function CommentList({ comments, handleSubmit, getReplies }) {
  return (
    <div className={cx("comments")}>
      {comments.map((comment) => {
        return (
          <div className={cx("comment-group")} key={comment._id}>
            <CommentItem
              comment={comment}
              handleReplySubmit={handleSubmit}
              getReplies={getReplies}
              canReply
            />
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
};

export default CommentList;
