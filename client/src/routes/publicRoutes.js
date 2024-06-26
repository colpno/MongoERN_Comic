import { BlankLayout, ComicLayout, LoginLayout, ReadingLayout } from "layouts";
import {
  Complete,
  ContentList,
  ForgotPassword,
  Home,
  Login,
  VerifyLogin,
  NotFound,
  Notice,
  NoticeList,
  Ranking,
  Reading,
  Register,
  ResetPassword,
  Search,
  Title,
  VerifyAccount,
  Weekly,
} from "pages";

export const publicRoutes = [
  { path: "/not-found", component: NotFound },
  { path: "/", component: Home },
  {
    path: "/login",
    component: Login,
    layout: LoginLayout,
  },
  {
    path: "/login/verify",
    component: VerifyLogin,
  },
  {
    path: "/register",
    component: Register,
    layout: LoginLayout,
  },
  {
    path: "/register/verify/:token",
    component: VerifyAccount,
    layout: BlankLayout,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/reset-password/:token",
    component: ResetPassword,
  },
  {
    path: "/search",
    component: Search,
  },
  {
    path: "/comic/weekly",
    component: Weekly,
    layout: ComicLayout,
  },
  {
    path: "/comic/ranking",
    component: Ranking,
    layout: ComicLayout,
  },
  {
    path: "/comic/complete",
    component: Complete,
    layout: ComicLayout,
  },
  {
    path: "/comic/title/:titleId",
    component: Title,
  },
  {
    path: "/comic/title/:titleId/:page",
    component: Reading,
    layout: ReadingLayout,
  },
  {
    path: "/content-list/:genreId",
    component: ContentList,
  },
  {
    path: "/notice-list",
    component: NoticeList,
  },
  {
    path: "/notice/:noticeId",
    component: Notice,
  },
  { path: "/static/term", component: Home },
  { path: "/static/privacy-policy", component: Home },
];
