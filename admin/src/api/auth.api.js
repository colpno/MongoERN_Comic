import { emitToast } from "features/Toast";
import comicApi from "./comicApi";

const BASE_URL = "/auth";

const extendedApi = comicApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ username, password }) => ({
        method: "POST",
        url: `${BASE_URL}/login`,
        data: { username, password },
      }),
    }),
    logout: build.query({
      query: () => ({
        method: "GET",
        url: `${BASE_URL}/logout`,
      }),
      transformResponse: (response) => {
        emitToast(response.message, "success");
        return response;
      },
      invalidatesTags: ["Chapter Transaction"],
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
      }),
    }),
    resetPassword: build.mutation({
      query: ({ password, token }) => ({
        method: "PUT",
        url: `${BASE_URL}/reset-password/${token}`,
        data: { password },
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
      }),
    }),
  }),
});

export const {
  useForgotPasswordMutation,
  useLazyLogoutQuery,
  useLoginMutation,
  useLogoutQuery,
  useResetPasswordMutation,
  useSendOTPMutation,
  useVerifyLoginMutation,
  useVerifyRegisterMutation,
} = extendedApi;
