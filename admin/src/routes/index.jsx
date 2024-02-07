import { AdminLayout, BioLayout, LoginLayout } from "layouts";
import {
  Admins,
  ChangePassword,
  Chapters,
  Comment,
  Genres,
  Login,
  LoginOTP,
  Members,
  NotFound,
  Notifications,
  PaymentMethods,
  PersonalNotifications,
  Profile,
  Statuses,
  Titles,
  TradingStatistic,
  VisitStatistic,
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
    path: "/comments",
    component: Comment,
    layout: AdminLayout,
  },
  {
    path: "/payment-methods",
    component: PaymentMethods,
    layout: AdminLayout,
  },
  {
    path: "/statuses",
    component: Statuses,
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
  { path: "/profile", component: Profile, layout: BioLayout },
  { path: "/profile/password", component: ChangePassword, layout: BioLayout },
  {
    path: "/not-found",
    component: NotFound,
    layout: LoginLayout,
  },
];
