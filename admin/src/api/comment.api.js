import { socket } from "context/socketContext";
import { emitToast } from "features/Toast";
import comicApi from "./comicApi";

const BASE_URL = "/comments";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query({
      query: (params = {}) => ({
        url: BASE_URL,
        method: "GET",
        params,
      }),
      transformResponse: (response) => {
        if (response.pagination) return response;
        return response.data;
      },
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        if (socket) {
          try {
            await cacheDataLoaded;

            socket.on("send-comment", (comment) => {
              updateCachedData((draft) => [comment, ...draft]);
            });

            socket.on("delete-comment", (comment) => {
              updateCachedData((draft = []) => {
                const newComments = draft.map((oldComment) => {
                  if (oldComment._id === comment._id) {
                    return comment;
                  }
                  return oldComment;
                });
                return newComments;
              });
            });
          } catch {
            /* empty */
          }
        }

        await cacheEntryRemoved;
      },
    }),
    updateComment: build.mutation({
      query: ({ id, data }) => ({
        url: `${BASE_URL}/update${data.view ? "/view" : ""}/${id}`,
        method: "PUT",
        data,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
    }),
  }),
});

export const { useGetCommentsQuery, useUpdateCommentMutation, useLazyGetCommentsQuery } =
  extendedApi;
