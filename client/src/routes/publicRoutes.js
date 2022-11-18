// eslint-disable-next-line no-unused-vars
import { ComicLayout, LoginLayout, ReadingLayout } from "layouts";
import {
  Complete,
  ContentList,
  ForgotPassword,
  Home,
  Login,
  Notice,
  NoticeList,
  Ranking,
  Reading,
  Register,
  ResetPassword,
  Search,
  Title,
  Weekly,
} from "pages";

export const publicRoutes = [
  { path: "/", component: Home },
  {
    path: "/login",
    component: Login,
    layout: LoginLayout,
  },
  {
    path: "/register",
    component: Register,
    layout: LoginLayout,
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
    // layout: ComicLayout,
  },
  {
    path: "/comic/ranking",
    component: Ranking,
    // layout: ComicLayout,
  },
  {
    path: "/comic/complete",
    component: Complete,
    // layout: ComicLayout,
  },
  {
    path: "/comic/title/:titleId",
    component: Title,
  },
  {
    path: "/comic/title/:titleId/:chapterId",
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
  // { path: "/static/term", component: Home },
  // { path: "/static/privacy-policy", component: Home },
];
