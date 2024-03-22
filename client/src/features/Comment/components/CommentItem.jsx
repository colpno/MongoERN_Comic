import PropTypes from "prop-types";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import CommentItemFigure from "./CommentItemFigure";
import CommentReplyList from "./CommentReplyList.jsx";
import DeletedComment from "./DeletedComment";

function CommentItem({ comment, handleReplySubmit, getReplies, canReply, handleDelete }) {
  const user = useSelector((state) => state.user.user);
  const title = useSelector((state) => state.title.title);
  const [toggleReply, setToggleReply] = useState(false);
  const canDelete = user._id === title.user_id || user._id === comment.author._id;

  const handleToggleReply = () => {
    setToggleReply((prev) => !prev);
  };

  return (
    <>
      {comment.deletedBy ? (
        <DeletedComment comment={comment} />
      ) : (
        <CommentItemFigure
          comment={comment}
          canReply={canReply}
          handleToggleReply={handleToggleReply}
          canDelete={canDelete}
          handleDelete={handleDelete}
        />
      )}
      {canReply ? (
        <CommentReplyList
          RenderedReplyAs={CommentItem}
          comment={comment}
          getReplies={getReplies}
          handleDelete={handleDelete}
          handleReplySubmit={handleReplySubmit}
          toggleReply={toggleReply}
        />
      ) : null}
    </>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    text: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.node.isRequired]).isRequired,
    slug: PropTypes.string.isRequired,
    comment_replies_num: PropTypes.number.isRequired,
    deletedBy: PropTypes.shape({}),
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  handleReplySubmit: PropTypes.func,
  getReplies: PropTypes.func,
  canReply: PropTypes.bool,
  handleDelete: PropTypes.func.isRequired,
};

CommentItem.defaultProps = {
  canReply: false,
  getReplies: () => {},
  handleReplySubmit: () => {},
};

export default memo(CommentItem);
