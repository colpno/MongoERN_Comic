import { useCallback } from "react";

function useCommentReplies(comments = []) {
  const getReplies = useCallback(
    (slug, limit = 5, page = 1) => {
      const replies = comments.filter((comment) => {
        return !!comment.parent_slug && slug.includes(comment.parent_slug);
      });
      return replies.slice(0, limit * page);
    },
    [comments]
  );

  return getReplies;
}

export default useCommentReplies;
