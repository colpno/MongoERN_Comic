import { socket } from "context/socketContext.js";
import { useEffect } from "react";

function useCommentSocket(comment, setReplies) {
  useEffect(() => {
    if (socket) {
      socket.on("send-comment", (cmt) => {
        if (cmt.parent_slug === comment.slug) setReplies((prev) => [cmt, ...prev]);
      });
      socket.on("delete-comment", (cmt) => {
        setReplies((prev) => {
          const newReplies = prev.map((oldReply) => {
            if (oldReply._id === cmt._id) {
              return cmt;
            }
            return oldReply;
          });
          return newReplies;
        });
      });
    }
  }, [socket, comment.slug]);
}

export default useCommentSocket;
