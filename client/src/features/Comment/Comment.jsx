import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Button, HeadTitleMark } from "components";
import { socket } from "context/socketContext";
import { Pagination, Popup, ProgressCircle } from "features";
import { useToast } from "hooks";
import { commentService } from "services";
import { CommentForm, CommentList } from "./components";
import styles from "./styles/Comment.module.scss";

const cx = classNames.bind(styles);

function Comment() {
  const { comment_at: commentAt } = useSelector((state) => state.comment);
  const { user, isLoggingIn } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [rootComments, setRootComments] = useState([]);
  const [paginate, setPaginate] = useState({ page: 1, limit: 15, total: 0 });
  const [progress, setProgress] = useState(0);
  const { Toast, options, toastEmitter } = useToast();
  const [popup, setPopup] = useState({
    trigger: false,
    isConfirm: false,
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

    if (text && commentAt) {
      const data = {
        author: user._id,
        commentAt,
        text,
        parentSlug: slug,
      };

      const newComment = commentService
        .add(data, setProgress)
        .then(() => {
          resetForm();
        })
        .catch((error) => {
          toastEmitter(error, "error");
        });

      setProgress(0);
      return newComment;
    }

    setSubmitting(false);
    return null;
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
    setPopup((prev) => ({ ...prev, trigger: true, commentId }));
    console.log(popup);
  };

  useEffect(() => {
    if (popup.isConfirm) {
      commentService
        .update(popup.commentId, { deletedBy: user._id }, setProgress)
        .then(() => {
          setProgress(0);
        })
        .catch((error) => {
          setProgress(0);
          toastEmitter(error, "error");
        });
      setPopup((prev) => ({ ...prev, isConfirm: false }));
    }
  }, [popup.isConfirm]);

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
          <p className={cx("sign-in")}>
            Bạn phải{" "}
            <Button text to="/login" className={cx("link")}>
              đăng nhập
            </Button>{" "}
            hoặc{" "}
            <Button text to="/register" className={cx("link")}>
              tạo tài khoản
            </Button>{" "}
            để bình luận.
          </p>
        )}
        <CommentList
          comments={rootComments}
          getReplies={getReplies}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
        />
        <Pagination pagination={paginate} setPagination={setPaginate} />
      </section>
      <ProgressCircle percentage={progress} />
      <Toast {...options} />
      <Popup yesno popup={popup} setPopup={setPopup} />
    </>
  );
}

export default Comment;
