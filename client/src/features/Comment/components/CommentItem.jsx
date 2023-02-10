import classNames from "classnames/bind";
import DOMPurify from "dompurify";
import { useSelector } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";
import { memo, useEffect, useState } from "react";

import { Button } from "components";
import { socket } from "context/socketContext";
import styles from "../styles/CommentItem.module.scss";
import CommentForm from "./CommentForm";
import ReadMore from "./ReadMore";

const cx = classNames.bind(styles);

function CommentItem({ comment, handleReplySubmit, getReplies, canReply, handleDelete }) {
  const user = useSelector((state) => state.user.user);
  const title = useSelector((state) => state.title.title);
  const [toggleReply, setToggleReply] = useState(false);
  const [replies, setReplies] = useState([]);
  const [paginate, setPaginate] = useState({ page: 0, limit: 5 });
  const repliesRemaining = comment.comment_replies_num - paginate.page * paginate.limit;
  const initialFormValues = { ...comment, text: "" };
  const canDelete = user._id === title.user_id || user._id === comment.author._id;

  const handleToggleReply = () => {
    setToggleReply((prev) => !prev);
  };

  const moreReplies = (slug, newPage) => {
    setReplies(getReplies(slug, paginate.limit, newPage));
    setPaginate((prev) => ({ ...prev, page: newPage }));
  };

  const purifyDOM = (text) => {
    return { __html: DOMPurify.sanitize(text) };
  };

  useEffect(() => {
    if (socket) {
      socket.on("send-comment", (cmt) => {
        if (cmt.parent_slug === comment.slug) setReplies((prev) => [cmt, ...prev]);
      });
    }
  }, [socket]);

  return (
    <>
      <div className={cx("comment")}>
        <div className={cx("avatar-container")}>
          <img src={comment.author.avatar} alt="avatar" className={cx("avatar")} />
        </div>
        <div className={cx("content")}>
          <p className={cx("username")}>{comment.author.username}</p>
          <ReadMore>
            <div
              className={cx("text")}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={purifyDOM(comment.text)}
            />
          </ReadMore>

          <div>
            <div className={cx("comment-time")}>{moment(comment.createdAt).fromNow(true)}</div>
            {canReply ? (
              <Button text className={cx("reply")} onClick={handleToggleReply}>
                Phản hồi
              </Button>
            ) : null}
            {canDelete && (
              <Button
                text
                onClick={() => handleDelete(comment._id)}
                className={cx("delete-button")}
              >
                Xóa
              </Button>
            )}
          </div>
        </div>
      </div>
      {canReply ? (
        <div className={cx("replies")}>
          {toggleReply ? (
            <CommentForm handleSubmit={handleReplySubmit} initialValues={initialFormValues} />
          ) : null}
          {replies.map((reply) => {
            return <CommentItem comment={reply} key={reply._id} />;
          })}
          {repliesRemaining > 0 && (
            <Button text onClick={() => moreReplies(comment.slug, paginate.page + 1)}>
              Xem thêm {repliesRemaining} bình luận.
            </Button>
          )}
        </div>
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
