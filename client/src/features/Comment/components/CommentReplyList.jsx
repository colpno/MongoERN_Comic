import classNames from "classnames/bind";
import { Button } from "components/index.jsx";
import PropTypes from "prop-types";
import { useState } from "react";
import styles from "../styles/CommentItem.module.scss";
import CommentForm from "./CommentForm.jsx";
import useCommentSocket from "../hooks/useCommentSocket.jsx";

const cx = classNames.bind(styles);

function CommentReplyList({
  comment,
  handleReplySubmit,
  handleDelete,
  toggleReply,
  RenderedReplyAs,
  getReplies,
}) {
  const [replies, setReplies] = useState([]);
  const [paginate, setPaginate] = useState({ page: 0, limit: 5 });
  const repliesRemaining = comment.comment_replies_num - paginate.page * paginate.limit;
  const initialFormValues = { ...comment, text: "" };

  useCommentSocket(comment, setReplies);

  const moreReplies = (slug, newPage) => {
    setReplies(getReplies(slug, paginate.limit, newPage));
    setPaginate((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className={cx("replies")}>
      {toggleReply ? (
        <CommentForm handleSubmit={handleReplySubmit} initialValues={initialFormValues} />
      ) : null}
      {replies.map((reply) => {
        // return <CommentItem comment={reply} handleDelete={handleDelete} key={reply._id} />;
        return <RenderedReplyAs comment={reply} handleDelete={handleDelete} key={reply._id} />;
      })}
      {repliesRemaining > 0 && (
        <Button text onClick={() => moreReplies(comment.slug, paginate.page + 1)}>
          Xem thêm {repliesRemaining} bình luận.
        </Button>
      )}
    </div>
  );
}

CommentReplyList.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    comment_replies_num: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
  handleReplySubmit: PropTypes.func,
  getReplies: PropTypes.func,
  toggleReply: PropTypes.bool.isRequired,
  RenderedReplyAs: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

CommentReplyList.defaultProps = {
  getReplies: () => {},
  handleReplySubmit: () => {},
};

export default CommentReplyList;
