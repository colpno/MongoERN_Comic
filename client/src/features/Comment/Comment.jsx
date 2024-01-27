import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { HeadTitleMark } from "components";
import { socket } from "context/socketContext";
import { Pagination, Popup } from "features";
import { usePopup, useToast } from "hooks";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { commentService } from "services";
import { CommentForm, CommentList, RequireSignIn } from "./components";
import styles from "./styles/Comment.module.scss";

const cx = classNames.bind(styles);

function Comment() {
  const dispatch = useDispatch();
  const commentAt = useSelector((state) => state.comment.comment_at);
  const { user, isLoggingIn } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [rootComments, setRootComments] = useState([]);
  const [paginate, setPaginate] = useState({ page: 1, limit: 15, total: 0 });
  const { toastEmitter } = useToast();
  const { popup, setPopup, triggerPopup } = usePopup({
    isShown: false,
    type: "confirm",
    title: "Xóa bình luận",
    content: "Bạn có chắc chắn muốn xóa?",
  });
  const initialFormValues = { text: "" };

  const fetchComments = () => {
    const params = {
      comment_at: commentAt,
      _embed: JSON.stringify([
        { collection: "author", fields: "avatar username" },
        { collection: "deletedBy", fields: "username" },
      ]),
      _fields: "author text slug parent_slug comment_replies_num createdAt deletedBy",
    };

    commentService
      .getAll(params)
      .then((response) => setComments(response.data))
      .catch((error) => toastEmitter(error, "error"));
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const { text, slug } = values;
    dispatch(setLoading(true));

    if (text && commentAt) {
      const data = {
        author: user._id,
        commentAt,
        text,
        parentSlug: slug,
      };

      commentService
        .add(data)
        .then(() => {
          resetForm();
        })
        .catch((error) => {
          toastEmitter(error, "error");
        });
    }

    dispatch(setLoading(false));
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
    dispatch(setLoading(true));

    setPopup({
      isShown: true,
      onConfirm: () => {
        commentService
          .update(commentId, { deletedBy: user._id })
          .then(() => {})
          .catch((error) => {
            toastEmitter(error, "error");
          });
      },
    });

    dispatch(setLoading(false));
  };

  useEffect(() => {
    if (socket) {
      socket.on("send-comment", (comment) => {
        setComments((prev) => [comment, ...prev]);
      });
      socket.on("delete-comment", (comment) => {
        setComments((prev) => {
          const newComments = prev.map((oldComment) => {
            if (oldComment._id === comment._id) {
              return comment;
            }
            return oldComment;
          });
          return newComments;
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    const root = comments.filter((comment) => {
      return comment.parent_slug === "";
    });
    const paginated = root.slice(
      (paginate.page - 1) * paginate.limit,
      paginate.limit * paginate.page
    );
    setPaginate((prev) => ({ ...prev, total: root.length }));
    setRootComments(paginated);
  }, [comments, paginate.page]);

  useEffect(() => {
    if (commentAt) {
      fetchComments();
    }
  }, [commentAt]);

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
      {popup.isShown && <Popup data={popup} setShow={triggerPopup} />}
    </>
  );
}

export default Comment;
