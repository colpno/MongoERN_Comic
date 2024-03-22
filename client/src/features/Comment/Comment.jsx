import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import { HeadTitleMark } from "components";
import { Popup } from "features";
import { useAddComment, usePopup, useUpdateComment } from "hooks";
import { useState } from "react";
import { Pagination } from "react-bootstrap";
import { CommentForm, CommentList, RequireSignIn } from "./components";
import useCommentReplies from "./hooks/useCommentReplies.jsx";
import useComments from "./hooks/useComments.jsx";
import styles from "./styles/Comment.module.scss";

const cx = classNames.bind(styles);
const COMMENT_LIMIT = 15;

function Comment() {
  const commentAt = useSelector((state) => state.comment.comment_at);
  const { user, isLoggingIn } = useSelector((state) => state.user);
  const { popup, setPopup, triggerPopup } = usePopup();
  const [paginate, setPaginate] = useState({ page: 1, limit: COMMENT_LIMIT, total: 0 });
  const { comments } = useComments(paginate, commentAt);
  const getReplies = useCommentReplies(comments);
  const { add } = useAddComment();
  const { update } = useUpdateComment();

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const { text, slug } = values;

    if (text && commentAt) {
      const data = {
        author: user._id,
        commentAt,
        text,
        parentSlug: slug,
      };
      add(data).then(() => {
        resetForm();
      });
    }

    setSubmitting(false);
  };

  const handleDelete = (commentId) => {
    setPopup({
      isTriggered: true,
      variation: "confirm",
      title: "Xóa bình luận",
      content: "Bạn có chắc chắn muốn xóa?",
      onConfirm: () => {
        update({ id: commentId, data: { deletedBy: user._id } });
      },
    });
  };

  return (
    <>
      <section>
        <HeadTitleMark>
          <p className={cx("total-comments")}>Bình luận ({comments.length})</p>
        </HeadTitleMark>
        {isLoggingIn ? <CommentForm handleSubmit={handleSubmit} /> : <RequireSignIn />}
        <CommentList
          comments={comments}
          getReplies={getReplies}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
        />
        <Pagination pagination={paginate} setPagination={setPaginate} />
      </section>
      <Popup data={popup} trigger={triggerPopup} />
    </>
  );
}

export default Comment;
