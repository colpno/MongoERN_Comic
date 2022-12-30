import classNames from "classnames/bind";
import moment from "moment";
import PropTypes from "prop-types";
import { memo, useState } from "react";
import DOMPurify from "dompurify";

import { Button } from "components";
import styles from "../styles/CommentItem.module.scss";
import CommentForm from "./CommentForm";
import ReadMore from "./ReadMore";

const cx = classNames.bind(styles);

function CommentItem({ comment, handleReplySubmit, getReplies, canReply }) {
  const [toggleReply, setToggleReply] = useState(false);
  const [replies, setReplies] = useState([]);
  const [paginate, setPaginate] = useState({ page: 0, limit: 5 });
  const repliesRemaining =
    comment.comment_replies_num - paginate.page * paginate.limit;
  const initialFormValues = { ...comment, text: "" };

  const handleToggleReply = () => {
    setToggleReply((prev) => !prev);
  };

  const moreReplies = (slug, newPage) => {
    setReplies(getReplies(slug, paginate.limit, newPage));
    setPaginate((prev) => ({ ...prev, page: newPage }));
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const newComment = await handleReplySubmit(values, { setSubmitting });
    setReplies((prev) => [newComment, ...prev]);

    setSubmitting(false);
  };

  const purifyDOM = (text) => {
    return { __html: DOMPurify.sanitize(text) };
  };

  return (
    <>
      <div className={cx("comment")}>
        <div className={cx("avatar-container")}>
          <img
            src={comment.author.avatar}
            alt="avatar"
            className={cx("avatar")}
          />
        </div>
        <div className={cx("content")}>
          <div className={cx("username")}>{comment.author.name}</div>
          <ReadMore>
            <div
              className={cx("text")}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={purifyDOM(comment.text)}
            />
          </ReadMore>
          <div>
            <div className={cx("comment-time")}>
              {moment(comment.createdAt).fromNow(true)}
            </div>
            {canReply ? (
              <Button text className={cx("reply")} onClick={handleToggleReply}>
                Phản hồi
              </Button>
            ) : null}
          </div>
        </div>
      </div>
      {canReply ? (
        <div className={cx("replies")}>
          {toggleReply ? (
            <CommentForm
              handleSubmit={handleSubmit}
              initialValues={initialFormValues}
            />
          ) : null}
          {replies.map((reply) => {
            return <CommentItem comment={reply} key={reply._id} />;
          })}
          {repliesRemaining > 0 && (
            <Button
              text
              onClick={() => moreReplies(comment.slug, paginate.page + 1)}
            >
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
    author: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    text: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.node.isRequired,
    ]).isRequired,
    slug: PropTypes.string.isRequired,
    comment_replies_num: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  handleReplySubmit: PropTypes.func,
  getReplies: PropTypes.func,
  canReply: PropTypes.bool,
};

CommentItem.defaultProps = {
  canReply: false,
  getReplies: () => {},
  handleReplySubmit: () => {},
};

export default memo(CommentItem);
