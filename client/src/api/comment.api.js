import { socket } from "context/socketContext.js";
import { emitToast } from "features/Toast.jsx";
import comicApi from "./comicApi.js";

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
        }

        await cacheEntryRemoved;
      },
    }),
    addComment: build.mutation({
      query: (data = {}) => ({
        url: `${BASE_URL}/create`,
        method: "POST",
        data,
        withCredentials: true,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
    }),
    updateComment: build.mutation({
      query: ({ id, data }) => ({
        url: `${BASE_URL}/update${data.view ? "/view" : ""}/${id}`,
        method: "PUT",
        data,
        withCredentials: true,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useLazyGetCommentsQuery,
} = extendedApi;
