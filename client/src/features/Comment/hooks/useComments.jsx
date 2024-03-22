import { useLazyGetComments } from "hooks/index.jsx";
import { useEffect } from "react";

const defaultPagination = {
  page: 1,
  limit: 0,
};

function useComments(pagination = defaultPagination, commentAt = "") {
  const { get: getComments, data: comments } = useLazyGetComments();

  useEffect(() => {
    getComments({
      comment_at: commentAt,
      parent_slug: "",
      _embed: JSON.stringify([
        { collection: "author", fields: "avatar username" },
        { collection: "deletedBy", fields: "username" },
      ]),
      _fields: "author text slug parent_slug comment_replies_num createdAt deletedBy",
      _sort: {
        createdAt: -1,
      },
      _limit: pagination.limit,
      _page: pagination.page,
    });
  }, [commentAt, pagination.limit]);

  return {
    comments,
  };
}

export default useComments;
