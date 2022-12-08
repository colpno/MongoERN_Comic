/* eslint-disable no-unused-vars */
import { AdminLayout, LoginLayout, ReadingLayout } from "layouts";
import {
  AdminManagement,
  ChapterManagement,
  GenreManagement,
  IncomeStatistic,
  MemberManagement,
  PaymentMethodManagement,
  TitleManagement,
  VisitStatistic,
  Login,
  NotFound,
  LoginOTP,
  Title,
} from "pages";
import Reading from "pages/Reading";

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
    component: TitleManagement,
    layout: AdminLayout,
  },
  {
    path: "/title/:titleId",
    component: Title,
    layout: AdminLayout,
  },
  {
    path: "/title/:titleId/:chapterId",
    component: Reading,
    layout: ReadingLayout,
  },
  {
    path: "/chapters",
    component: ChapterManagement,
    layout: AdminLayout,
  },
  {
    path: "/genres",
    component: GenreManagement,
    layout: AdminLayout,
  },
  {
    path: "/members",
    component: MemberManagement,
    layout: AdminLayout,
  },
  {
    path: "/administrators",
    component: AdminManagement,
    layout: AdminLayout,
  },
  {
    path: "/payment-methods",
    component: PaymentMethodManagement,
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
