import { emitToast } from "features/Toast.jsx";
import comicApi from "./comicApi.js";

const BASE_URL = "/auth";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ username, password }) => ({
        method: "POST",
        url: `${BASE_URL}/login`,
        data: { username, password },
        withCredentials: true,
      }),
      // queryFn: ({ username, password }, api, extraOptions, baseQuery) => {
      //   const { user } = api.getState().user;
      //   return baseQuery({
      //     method: "POST",
      //     url: `${BASE_URL}/login`,
      //     data: { username, password, user },
      //     withCredentials: true,
      //   });
      // },
    }),
    logout: build.query({
      query: () => ({
        method: "GET",
        url: `${BASE_URL}/logout`,
        withCredentials: true,
      }),
      transformResponse: (response) => {
        emitToast(response.message, "success");
        return response;
      },
    }),
    verifyRegister: build.mutation({
      query: (token) => ({
        method: "PUT",
        url: `${BASE_URL}/register/verify/${token}`,
      }),
      transformResponse: (response) => {
        emitToast(response.message, "success");
        return response;
      },
    }),
    verifyLogin: build.mutation({
      query: ({ id, username, email, otp, oid }) => ({
        method: "POST",
        url: `${BASE_URL}/login/verify`,
        data: { id, username, email, otp, oid },
        withCredentials: true,
      }),
      transformResponse: (response) => {
        const { message, data } = response;
        emitToast(message, "success");
        return data;
      },
    }),
    forgotPassword: build.mutation({
      query: ({ username, email }) => ({
        method: "POST",
        url: `${BASE_URL}/forgot-password`,
        data: { username, email },
        withCredentials: true,
      }),
    }),
    resetPassword: build.mutation({
      query: ({ password, token }) => ({
        method: "PUT",
        url: `${BASE_URL}/reset-password/${token}`,
        data: { password },
        withCredentials: true,
      }),
      transformResponse: (response) => {
        emitToast(response.message, "success");
        return response;
      },
    }),
    sendOTP: build.mutation({
      query: ({ id, username, email }) => ({
        method: "POST",
        url: `${BASE_URL}/login/verify/re-send`,
        data: { id, username, email },
        withCredentials: true,
      }),
    }),
  }),
});

export const {
  useForgotPasswordMutation,
  useLazyLogoutQuery,
  useLoginMutation,
  useLogoutQuery,
  usePrefetch,
  useResetPasswordMutation,
  useSendOTPMutation,
  useVerifyLoginMutation,
  useVerifyRegisterMutation,
} = extendedApi;
