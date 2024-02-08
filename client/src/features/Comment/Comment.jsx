import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { HeadTitleMark } from "components";
import { Pagination, Popup } from "features";
import { useAddComment, useGetComments, usePopup, useUpdateComment } from "hooks";
import { CommentForm, CommentList, RequireSignIn } from "./components";
import styles from "./styles/Comment.module.scss";

const cx = classNames.bind(styles);
const COMMENT_LIMIT = 15;

function Comment() {
  const commentAt = useSelector((state) => state.comment.comment_at);
  const { user, isLoggingIn } = useSelector((state) => state.user);
  const [rootComments, setRootComments] = useState([]);
  const [paginate, setPaginate] = useState({ page: 1, limit: COMMENT_LIMIT, total: 0 });
  const { popup, setPopup, triggerPopup } = usePopup();
  const initialFormValues = { text: "" };
  const [comments, setComments] = useState([]);
  const { data: getData = [] } = useGetComments({
    comment_at: commentAt,
    _embed: JSON.stringify([
      { collection: "author", fields: "avatar username" },
      { collection: "deletedBy", fields: "username" },
    ]),
    _fields: "author text slug parent_slug comment_replies_num createdAt deletedBy",
    _sort: {
      createdAt: -1,
    },
    _limit: COMMENT_LIMIT,
  });
  const { add } = useAddComment();
  const { update } = useUpdateComment();

  useEffect(() => {
    setComments(getData);
  }, [getData, commentAt]);

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

  const getReplies = useCallback(
    (slug, limit = 5, page = 1) => {
      const replies = comments.filter((comment) => {
        return !!comment.parent_slug && slug.includes(comment.parent_slug);
      });
      return replies.slice(0, limit * page);
    },
    [comments]
  );

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

  useEffect(() => {
    if (comments.length > 0) {
      const root = comments.filter((comment) => {
        return comment.parent_slug === "";
      });
      const paginated = root.slice(
        (paginate.page - 1) * paginate.limit,
        paginate.limit * paginate.page
      );
      setPaginate((prev) => ({ ...prev, total: root.length }));
      setRootComments(paginated);
    }
  }, [comments]);

  return (
    <>
      <section>
        <HeadTitleMark>
          <p className={cx("total-comments")}>Bình luận ({comments.length})</p>
        </HeadTitleMark>
        {isLoggingIn ? (
          <CommentForm handleSubmit={handleSubmit} initialValues={initialFormValues} />
        ) : (
          <RequireSignIn cx={cx} />
        )}
        <CommentList
          comments={rootComments}
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
