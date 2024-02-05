import { AdminLayout, LoginLayout } from "layouts";
import {
  Admins,
  Chapters,
  Genres,
  Login,
  LoginOTP,
  Members,
  NotFound,
  Titles,
  Notifications,
  PersonalNotifications,
  PaymentMethods,
  TradingStatistic,
  VisitStatistic,
  Comment,
} from "pages";

export const adminRoutes = [
  {
    path: "/",
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
    path: "/notifications",
    component: Notifications,
    layout: AdminLayout,
  },
  {
    path: "/personal-notifications",
    component: PersonalNotifications,
    layout: AdminLayout,
  },
  {
    path: "/payment-methods",
    component: PaymentMethods,
    layout: AdminLayout,
  },
  {
    path: "/comments",
    component: Comment,
    layout: AdminLayout,
  },
  {
    path: "/income",
    component: TradingStatistic,
    layout: AdminLayout,
  },
  {
    path: "/visit",
    component: VisitStatistic,
    layout: AdminLayout,
  },
  {
    path: "/not-found",
    component: NotFound,
    layout: LoginLayout,
  },
];
