/* eslint-disable no-unused-vars */
import { AdminLayout, BlankLayout, LoginLayout, ReadingLayout } from "layouts";
import {
  Admins,
  Chapters,
  Genres,
  IncomeStatistic,
  Members,
  PaymentMethods,
  Titles,
  VisitStatistic,
  Login,
  NotFound,
  LoginOTP,
} from "pages";

export const adminRoutes = [
  {
    path: "/login",
    component: Login,
    layout: LoginLayout,
  },
  {
    path: "/verify",
    component: LoginOTP,
    layout: LoginLayout,
  },
  {
    path: "/titles",
    component: Titles,
    layout: AdminLayout,
  },
  // {
  //   path: "/title/:titleId/:chapterId",
  //   component: Reading,
  //   layout: BlankLayout,
  // },
  {
    path: "/chapters",
    component: Chapters,
    layout: AdminLayout,
  },
  {
    path: "/genres",
    component: Genres,
    layout: AdminLayout,
  },
  {
    path: "/members",
    component: Members,
    layout: AdminLayout,
  },
  {
    path: "/administrators",
    component: Admins,
    layout: AdminLayout,
  },
  {
    path: "/payment-methods",
    component: PaymentMethods,
    layout: AdminLayout,
  },
  // {
  //   path: "/income",
  //   component: IncomeStatistic,
  //   layout: AdminLayout,
  // },
  // {
  //   path: "/visit",
  //   component: VisitStatistic,
  //   layout: AdminLayout,
  // },
  {
    path: "/not-found",
    component: NotFound,
    layout: LoginLayout,
  },
];
