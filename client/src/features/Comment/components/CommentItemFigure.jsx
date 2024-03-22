import classNames from "classnames/bind";
import { Button } from "components/index.jsx";
import moment from "moment";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { purifyHTMLData } from "utils/purifyHTMLData.js";
import styles from "../styles/CommentItem.module.scss";
import ReadMore from "./ReadMore.jsx";

const cx = classNames.bind(styles);

function CommentItemFigure({ comment, canReply, handleToggleReply, canDelete, handleDelete }) {
  const isLoggingIn = useSelector((state) => state.user.isLoggingIn);

  return (
    <div className={cx("comment")}>
      <div className={cx("avatar-container")}>
        <img src={comment.author.avatar} alt="avatar" className={cx("avatar")} />
      </div>
      <div className={cx("content")}>
        <p className={cx("username")}>{comment.author.username}</p>
        <ReadMore>
          {/* eslint-disable-next-line react/no-danger */}
          <div className={cx("text")} dangerouslySetInnerHTML={purifyHTMLData(comment.text)} />
        </ReadMore>
        <div>
          <div className={cx("comment-time")}>{moment(comment.createdAt).fromNow(true)}</div>
          {canReply && isLoggingIn ? (
            <Button text className={cx("reply")} onClick={handleToggleReply}>
              Phản hồi
            </Button>
          ) : null}
          {canDelete && (
            <Button text onClick={() => handleDelete(comment._id)} className={cx("delete-button")}>
              Xóa
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

CommentItemFigure.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    deletedBy: PropTypes.string,
    text: PropTypes.string.isRequired,
  }).isRequired,
  canReply: PropTypes.bool.isRequired,
  handleToggleReply: PropTypes.func.isRequired,
  canDelete: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default CommentItemFigure;
