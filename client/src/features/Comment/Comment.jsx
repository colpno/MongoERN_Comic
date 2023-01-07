import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Button, HeadTitleMark } from "components";
import { socket } from "context/socketContext";
import { Pagination, ProgressCircle } from "features";
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
  const initialFormValues = { text: "" };

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
          setProgress(0);
        })
        .catch((error) => {
          console.error(error);
          setProgress(0);
        });

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

  useEffect(() => {
    if (socket) {
      socket.on("send-comment", (comment) => {
        setComments((prev) => [comment, ...prev]);
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
      const params = {
        comment_at: commentAt,
        _embed: JSON.stringify([{ collection: "author", fields: "avatar username" }]),
      };

      commentService
        .getAll(params)
        .then((response) => setComments(response.data))
        .catch((error) => console.error(error));
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
        <CommentList comments={rootComments} getReplies={getReplies} handleSubmit={handleSubmit} />
        <Pagination pagination={paginate} setPagination={setPaginate} />
      </section>
      <ProgressCircle percentage={progress} />
    </>
  );
}

export default Comment;
